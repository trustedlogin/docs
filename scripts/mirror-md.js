#!/usr/bin/env node
/**
 * Mirror docs/**\/*.md → static/**\/*.md so every doc page is also served
 * as raw Markdown for AI ingestion.
 *
 * After running, both URLs are live:
 *   /Client/integration-prompt    → rendered HTML page (Docusaurus)
 *   /Client/integration-prompt.md → raw Markdown source (this mirror)
 *
 * The .md form is what AI assistants and llms.txt-style consumers should
 * fetch. They get the YAML frontmatter and admonitions verbatim, which is
 * fine — most AI parsers handle both transparently.
 *
 * Wired into package.json's `prestart` and `prebuild`, so it runs every
 * time the dev server starts or the production build runs.
 *
 * The mirrored files are gitignored (auto-generated; tracking them would
 * just add noise on every doc edit).
 */

const fs = require( 'fs' );
const path = require( 'path' );

const ROOT = path.resolve( __dirname, '..' );
const SRC = path.join( ROOT, 'docs' );
const DEST = path.join( ROOT, 'static' );

let copied = 0;

function walk( dir ) {
	for ( const entry of fs.readdirSync( dir, { withFileTypes: true } ) ) {
		const full = path.join( dir, entry.name );
		if ( entry.isDirectory() ) {
			walk( full );
		} else if ( entry.name.endsWith( '.md' ) || entry.name.endsWith( '.mdx' ) ) {
			const rel = path.relative( SRC, full );
			const out = path.join( DEST, rel );
			fs.mkdirSync( path.dirname( out ), { recursive: true } );
			fs.copyFileSync( full, out );
			copied++;
		}
	}
}

if ( ! fs.existsSync( SRC ) ) {
	console.error( `mirror-md: source directory ${ SRC } not found` );
	process.exit( 1 );
}

walk( SRC );
console.log( `mirror-md: copied ${ copied } .md/.mdx files from docs/ → static/` );
