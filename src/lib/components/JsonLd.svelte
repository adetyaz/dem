<script lang="ts">
	/**
	 * Renders a JSON-LD script tag in svelte:head.
	 *
	 * Built via {@html} rather than a literal tag element: Svelte does not
	 * parse mustache expressions inside a script tag's content (it's treated
	 * as raw text), so an interpolated JSON.stringify(data) there would render
	 * literally instead of interpolating. This also has to land in the actual
	 * server-rendered HTML — most SEO and AI crawlers (GPTBot, ClaudeBot,
	 * PerplexityBot, and friends) fetch raw HTML and do not run JavaScript, so
	 * a client-only injection (e.g. an attachment) would be invisible to them.
	 *
	 * No angle-bracket character appears anywhere in this script block,
	 * including in comments: the Svelte compiler mis-tokenizes a raw one here
	 * as the start of an element or component tag.
	 */
	type Props = { data: Record<string, unknown> };
	let { data }: Props = $props();

	// The angle bracket is built from its char code so a script-ending
	// sequence inside any string value (say, a business name) can never
	// terminate the tag early.
	const angle = String.fromCharCode(60);
	const json = $derived(JSON.stringify(data).replaceAll(angle, '\\u003c'));
</script>

<!-- Below the component's own script block, a literal '<' is fine — the
     compiler only mis-tokenizes one inside the <script lang="ts"> above.

     The closing tag is split across a string concatenation, not written as
     one literal "</script>", so it can't be mistaken for actually closing
     this element while Svelte parses this file. -->
<!-- json is our own JSON.stringify output built from static site content,
     not user input. -->
<!-- eslint-disable svelte/no-at-html-tags -->
<svelte:head>
	{@html `<script type="application/ld+json">${json}<` + `/script>`}
</svelte:head>
<!-- eslint-enable svelte/no-at-html-tags -->
