<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { organizationSchema } from '$lib/content/organization';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<JsonLd data={organizationSchema} />

<!-- svh, not dvh: the smallest the viewport gets, so the page never shifts
     mid-scroll as the mobile URL bar collapses. -->
<div class="flex min-h-[100svh] flex-col">
	<SiteHeader />
	<main id="main" class="flex-1">
		{@render children()}
	</main>
	<SiteFooter />
</div>
