<script lang="ts">
	import PhotoPlate from './PhotoPlate.svelte';
	import type { Photo } from '$lib/content/photos';

	export type Slide = { photo: Photo; edgeLabel: string };

	let { slides, class: klass = '' }: { slides: Slide[]; class?: string } = $props();

	let active = $state(0);
</script>

<!--
	The 01/02/03 rail in the 2A canvas implies a three-photo hero, so it is a
	real control rather than a graphic. Manual only: an auto-advancing carousel
	animates without the visitor asking it to, and moves content they are
	reading.
-->
<div class="relative {klass}">
	{#each slides as slide, i (slide.edgeLabel)}
		<div
			class="slide absolute inset-0"
			data-active={i === active}
			aria-hidden={i === active ? undefined : 'true'}
			inert={i === active ? undefined : true}
		>
			<PhotoPlate photo={slide.photo} edgeLabel={slide.edgeLabel} class="h-full w-full" />
		</div>
	{/each}

	<!-- Holds the numerals legible over any exposure. -->
	<span
		class="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-2/5 bg-linear-to-t from-ink/80 to-transparent"
		aria-hidden="true"
	></span>

	<div class="absolute right-4 bottom-6 z-10 flex flex-col items-end gap-2 sm:right-5 sm:bottom-7">
		{#each slides as slide, i (slide.edgeLabel)}
			<button
				type="button"
				class="numeral"
				aria-pressed={i === active}
				onclick={() => (active = i)}
			>
				<span class="sr-only">Show photograph {i + 1}: {slide.photo.title}</span>
				<span class="rule" aria-hidden="true"></span>
				<span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
			</button>
		{/each}
	</div>
</div>

<style>
	.slide {
		opacity: 0;
		transition: opacity 300ms ease;
	}

	.slide[data-active='true'] {
		opacity: 1;
	}

	.numeral {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 5px 2px;
		background: none;
		border: none;
		cursor: pointer;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		color: var(--color-dust-dim);
		transition:
			color 150ms ease,
			transform 160ms var(--ease-out);
	}

	.numeral:active {
		transform: scale(0.94);
	}

	.rule {
		display: block;
		width: 18px;
		height: 1px;
		background: var(--color-taupe);
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 200ms var(--ease-out);
	}

	.numeral[aria-pressed='true'] {
		color: var(--color-bone);
	}

	.numeral[aria-pressed='true'] .rule {
		transform: scaleX(1);
	}

	@media (hover: hover) and (pointer: fine) {
		.numeral:hover {
			color: var(--color-dust-bright);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.numeral {
			transition: color 150ms ease;
		}

		.numeral:active {
			transform: none;
		}

		.rule {
			transition: none;
		}
	}
</style>
