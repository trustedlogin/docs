#!/usr/bin/env node
/**
 * Mirror docs/**\/*.md → static/**\/*.md so every doc page is served as
 * raw Markdown alongside its rendered HTML, and generate site-wide AI
 * affordances:
 *
 *   /Client/integration-prompt    → rendered HTML page (Docusaurus)
 *   /Client/integration-prompt.md → raw Markdown source (this mirror)
 *   /llms.txt                     → llmstxt.org-style site index for AI crawlers
 *   /llms-full.txt                → concatenated full source of every doc
 *
 * Frontmatter transformations:
 *
 *   Docusaurus-internal keys (sidebar_label, sidebar_position, slug, id,
 *   hide_*, toc_*, displayed_sidebar, draft, etc.) are stripped from the
 *   mirrored .md output. Public/universal keys (title, description,
 *   keywords, image, tags, last_update, authors) are preserved.
 *
 * Hidden sections:
 *
 *   docs/Guides/ is mirrored to static/ but excluded from llms.txt and
 *   llms-full.txt — those files surface only what's actually in the
 *   navigation. To re-include, remove the HIDDEN_TOP_LEVEL_DIRS check.
 *
 * Wired into package.json's `prestart` and `prebuild`. The mirrored output
 * is gitignored (auto-generated; tracking would just create noise on every
 * doc edit).
 */

const fs = require( 'fs' );
const path = require( 'path' );
const yaml = require( 'js-yaml' );

const ROOT = path.resolve( __dirname, '..' );
const SRC = path.join( ROOT, 'docs' );
const DEST = path.join( ROOT, 'static' );

// Pull canonical site URL from Docusaurus config so llms.txt links work.
let SITE_URL = '';
try {
	const cfg = require( path.resolve( ROOT, 'docusaurus.config.js' ) );
	SITE_URL = ( cfg.url || '' ).replace( /\/$/, '' );
} catch ( e ) {
	// best-effort; llms.txt URLs may be relative if config can't be read
}

const HIDDEN_TOP_LEVEL_DIRS = new Set( [ 'Guides' ] );

const DOCUSAURUS_KEYS = new Set( [
	'sidebar', 'sidebar_label', 'sidebar_position', 'sidebar_class_name', 'sidebar_custom_props',
	'slug', 'id',
	'hide_title', 'hide_table_of_contents',
	'toc_min_heading_level', 'toc_max_heading_level',
	'displayed_sidebar',
	'pagination_label', 'pagination_next', 'pagination_prev',
	'draft', 'unlisted',
	'parse_number_prefixes',
] );

function transformFrontmatter( content ) {
	const m = content.match( /^---\n([\s\S]*?)\n---\n?/ );
	if ( ! m ) return { fm: {}, body: content, transformed: content };

	let fm;
	try { fm = yaml.load( m[ 1 ] ) || {}; }
	catch { return { fm: {}, body: content, transformed: content }; }

	const cleaned = Object.fromEntries(
		Object.entries( fm ).filter( ( [ k ] ) => ! DOCUSAURUS_KEYS.has( k ) )
	);
	const body = content.slice( m[ 0 ].length ).replace( /^\n+/, '' );

	let transformed;
	if ( Object.keys( cleaned ).length === 0 ) {
		transformed = body;
	} else {
		const newFm = yaml.dump( cleaned ).trimEnd();
		transformed = `---\n${ newFm }\n---\n\n${ body }`;
	}
	return { fm, cleaned, body, transformed };
}

function urlForRel( rel ) {
	// Approximate Docusaurus URL: strip extension and numeric prefixes
	// (Docusaurus drops `01-` etc. when building routes).
	return rel
		.replace( /\.mdx?$/, '' )
		.split( '/' )
		.map( ( seg ) => seg.replace( /^\d+-/, '' ) )
		.join( '/' );
}

function extractH1( body ) {
	const m = body.match( /^#\s+(.+)/m );
	return m ? m[ 1 ].trim() : null;
}

const allPages = [];
let copied = 0;

function walk( dir ) {
	for ( const entry of fs.readdirSync( dir, { withFileTypes: true } ) ) {
		const full = path.join( dir, entry.name );
		if ( entry.isDirectory() ) {
			walk( full );
			continue;
		}
		if ( ! entry.name.endsWith( '.md' ) && ! entry.name.endsWith( '.mdx' ) ) continue;

		const rel = path.relative( SRC, full );
		const out = path.join( DEST, rel );
		const original = fs.readFileSync( full, 'utf-8' );
		const { fm, body, transformed } = transformFrontmatter( original );

		fs.mkdirSync( path.dirname( out ), { recursive: true } );
		fs.writeFileSync( out, transformed );
		copied++;

		const topLevel = rel.split( path.sep )[ 0 ];
		if ( HIDDEN_TOP_LEVEL_DIRS.has( topLevel ) ) continue;

		const slug = '/' + rel.replace( /\.mdx?$/, '.md' ).split( path.sep ).join( '/' );
		const htmlPath = '/' + urlForRel( rel ).split( path.sep ).join( '/' );
		allPages.push( {
			rel,
			mdUrl: SITE_URL + slug,
			htmlUrl: SITE_URL + htmlPath,
			title: fm.title || extractH1( body ) || rel,
			description: fm.description || '',
			body,
		} );
	}
}

if ( ! fs.existsSync( SRC ) ) {
	console.error( `mirror-md: source ${ SRC } not found` );
	process.exit( 1 );
}

walk( SRC );

// /llms.txt — site index for AI crawlers, llmstxt.org format.
{
	const lines = [];
	lines.push( '# TrustedLogin Documentation' );
	lines.push( '' );
	lines.push( '> Documentation for the TrustedLogin platform — Client SDK, Connector plugin, and SaaS application — for plugin and theme developers integrating secure, time-limited support access into WordPress.' );
	lines.push( '' );
	lines.push( 'Every page on this site is also served as raw Markdown by appending `.md` to the URL.' );
	lines.push( '' );

	const groups = {};
	for ( const p of allPages ) {
		const top = p.rel.split( path.sep )[ 0 ];
		const groupKey = top.endsWith( '.md' ) || top.endsWith( '.mdx' ) ? 'Overview' : top;
		( groups[ groupKey ] = groups[ groupKey ] || [] ).push( p );
	}

	const groupOrder = [ 'Overview', 'Client', 'Connector', 'SaaS' ];
	const orderedGroups = groupOrder.filter( ( g ) => groups[ g ] ).concat(
		Object.keys( groups ).filter( ( g ) => ! groupOrder.includes( g ) )
	);

	for ( const g of orderedGroups ) {
		lines.push( `## ${ g }` );
		lines.push( '' );
		for ( const p of groups[ g ] ) {
			const desc = p.description ? `: ${ p.description }` : '';
			lines.push( `- [${ p.title }](${ p.mdUrl })${ desc }` );
		}
		lines.push( '' );
	}

	fs.writeFileSync( path.join( DEST, 'llms.txt' ), lines.join( '\n' ) );
}

// /llms-full.txt — concatenated body for AI ingestion in a single fetch.
{
	const lines = [];
	lines.push( '# TrustedLogin Documentation (full)' );
	lines.push( '' );
	lines.push( 'Concatenated source for every documentation page. Sections separated by `---`. Each section names its source URL.' );
	lines.push( '' );
	for ( const p of allPages ) {
		lines.push( '---' );
		lines.push( '' );
		lines.push( `# ${ p.title }` );
		lines.push( '' );
		lines.push( `Source: ${ p.htmlUrl }  ` );
		lines.push( `Markdown: ${ p.mdUrl }` );
		lines.push( '' );
		lines.push( p.body.trim() );
		lines.push( '' );
	}
	fs.writeFileSync( path.join( DEST, 'llms-full.txt' ), lines.join( '\n' ) );
}

console.log(
	`mirror-md: copied ${ copied } files; indexed ${ allPages.length } pages into llms.txt + llms-full.txt`
);
