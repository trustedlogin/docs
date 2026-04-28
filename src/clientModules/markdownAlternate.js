/**
 * Adds <link rel="alternate" type="text/markdown" href="<current path>.md">
 * to every doc page so AI crawlers (and tools like Reader-mode extensions)
 * can auto-discover the raw Markdown form.
 *
 * The Markdown source is mirrored to /static/ by scripts/mirror-md.js, so
 * any `<path>` rendered by Docusaurus also resolves at `<path>.md`.
 *
 * Runs on initial page load and on Docusaurus client-side route changes.
 * Most modern crawlers (Googlebot, GPTBot, ClaudeBot) execute JS, so the
 * link is discoverable. For SSR-only crawlers, llms.txt at the site root
 * gives the same coverage.
 */
( function () {
	if ( typeof window === 'undefined' ) {
		return;
	}

	const SELECTOR = 'link[rel="alternate"][data-mirror-md="true"]';

	function update() {
		const path = window.location.pathname.replace( /\/$/, '' );
		const isMarkdownPath = /\.mdx?$/.test( path );
		let link = document.querySelector( SELECTOR );

		if ( ! path || isMarkdownPath ) {
			if ( link ) {
				link.remove();
			}
			return;
		}

		const href = path + '.md';
		if ( ! link ) {
			link = document.createElement( 'link' );
			link.rel = 'alternate';
			link.type = 'text/markdown';
			link.setAttribute( 'data-mirror-md', 'true' );
			document.head.appendChild( link );
		}
		if ( link.getAttribute( 'href' ) !== href ) {
			link.setAttribute( 'href', href );
		}
	}

	update();

	// Docusaurus uses client-side routing; intercept history changes so the
	// alternate link tracks navigation without a full reload.
	const origPush = window.history.pushState;
	const origReplace = window.history.replaceState;
	window.history.pushState = function () {
		const r = origPush.apply( this, arguments );
		setTimeout( update, 0 );
		return r;
	};
	window.history.replaceState = function () {
		const r = origReplace.apply( this, arguments );
		setTimeout( update, 0 );
		return r;
	};
	window.addEventListener( 'popstate', update );
} )();
