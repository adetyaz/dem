<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Photo } from '$lib/content/photos';

	type Props = {
		/**
		 * A real photograph. Without one the plate falls back to its hatch
		 * pattern, so a section still composes before its picture is supplied.
		 */
		photo?: Photo;
		/** Placeholder note, shown only when there is no photo. */
		caption?: string;
		/** Plat marginalia: tract name or coordinates, set vertically on the edge. */
		edgeLabel?: string;
		edgeSide?: 'left' | 'right';
		tone?: 'dark' | 'light' | 'light-2' | 'light-3';
		/** Boxes the plate in white with a drop shadow, as the collage plates are. */
		framed?: boolean;
		/** Focal point for the crop, e.g. 'center top'. */
		focus?: string;
		class?: string;
		children?: Snippet;
	};

	let {
		photo,
		caption,
		edgeLabel,
		edgeSide = 'left',
		tone = 'dark',
		framed = false,
		focus = 'center',
		class: klass = '',
		children
	}: Props = $props();

	const plate = $derived(
		photo
			? ''
			: {
					dark: 'plate-dark',
					light: 'plate-light',
					'light-2': 'plate-light-2',
					'light-3': 'plate-light-3'
				}[tone]
	);

	const captionTone = $derived(
		tone === 'dark' ? 'bg-ink text-dust-soft' : 'bg-bone/80 text-slate-dim'
	);
</script>

<div
	class="relative flex items-end overflow-hidden bg-ink-raised {plate} {framed
		? 'border-4 border-white shadow-[0_18px_40px_rgba(27,25,23,0.14)] sm:border-8'
		: ''} {klass}"
>
	{#if photo}
		<img
			class="absolute inset-0 h-full w-full object-cover"
			style="object-position: {focus};"
			src={photo.src}
			alt={photo.alt}
			width={photo.width}
			height={photo.height}
			loading="lazy"
			decoding="async"
		/>
		{#if edgeLabel}
			<!-- Scrim only along the labelled edge, so the rest of the photograph
			     keeps its full contrast. -->
			<span
				class="pointer-events-none absolute inset-0 {edgeSide === 'left'
					? 'bg-linear-to-r'
					: 'bg-linear-to-l'} from-ink/80 to-transparent to-32%"
				aria-hidden="true"
			></span>
		{/if}
	{/if}

	{#if edgeLabel}
		<span
			class="pointer-events-none absolute top-1/2 z-10 font-mono text-[10px] tracking-[0.28em] whitespace-nowrap {edgeSide ===
			'left'
				? 'left-3 -translate-y-1/2 rotate-180 sm:left-4'
				: 'right-3 -translate-y-1/2 sm:right-4'} {photo || tone === 'dark'
				? 'text-dust-soft'
				: 'text-slate-dim'}"
			style="writing-mode: vertical-rl;"
		>
			{edgeLabel}
		</span>
	{/if}

	{#if caption && !photo}
		<span
			class="m-3 max-w-[calc(100%-1.5rem)] px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] sm:m-4 sm:text-[11px] {captionTone} {edgeLabel &&
			edgeSide === 'left'
				? 'ml-10 sm:ml-12'
				: ''}"
		>
			{caption}
		</span>
	{/if}

	{@render children?.()}
</div>
