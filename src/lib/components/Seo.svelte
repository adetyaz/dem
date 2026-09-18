<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/site';
	import ogImage from '$lib/assets/og-image.png';

	/** Same shape as `content/photos.ts`'s `Photo`, so a real photo can be
	 *  passed once one exists at proper social-preview resolution. */
	type OgImage = { src: string; width: number; height: number; alt: string };

	const defaultImage: OgImage = {
		src: ogImage,
		width: 1200,
		height: 630,
		alt: `${site.name} — ${site.tagline}`
	};

	type Props = {
		title: string;
		description: string;
		/** Defaults to a generated brand card (1200×630) — every source photo is
		 *  far below that resolution today. Swap in a real photo here once one
		 *  is shot at proper social-preview size; see `$lib/assets/og-image.png`. */
		image?: OgImage;
	};

	let { title, description, image = defaultImage }: Props = $props();

	// Pulled from the router rather than passed in, so the canonical URL can
	// never drift from the route it's actually rendered on.
	const canonical = $derived(`${site.url}${page.url.pathname}`.replace(/\/$/, '') || site.url);
	const imageUrl = $derived(`${site.url}${image.src}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content={String(image.width)} />
	<meta property="og:image:height" content={String(image.height)} />
	<meta property="og:image:alt" content={image.alt} />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card (Open Graph tags above cover the rest) -->
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
