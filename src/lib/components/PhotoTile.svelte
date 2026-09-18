<script lang="ts">
	import type { Photo } from '$lib/content/photos';

	let { photo, onopen }: { photo: Photo; onopen: () => void } = $props();
</script>

<!--
	figure/figcaption is the honest structure: the caption belongs to the image,
	so screen readers get it in place even though it is only painted on hover.
	Touch has no hover, so the short title chip is always visible and the full
	caption is one tap away in the lightbox.
-->
<figure class="tile-figure">
	<button type="button" class="tile" onclick={onopen} aria-label="Enlarge photo: {photo.title}">
		<img
			class="shot"
			src={photo.src}
			alt={photo.alt}
			width={photo.width}
			height={photo.height}
			loading="lazy"
			decoding="async"
		/>
	</button>

	<span class="chip" aria-hidden="true">{photo.title}</span>

	<figcaption class="veil">
		<span class="veil-text">{photo.caption}</span>
		<span class="veil-hint" aria-hidden="true">Click to enlarge</span>
	</figcaption>
</figure>

<style>
	.tile-figure {
		position: relative;
		margin: 0;
		overflow: hidden;
		border-radius: 10px;
		background: var(--color-bone-line);
		isolation: isolate;
	}

	.tile {
		display: block;
		width: 100%;
		padding: 0;
		border: none;
		background: none;
		cursor: pointer;
		/* The tile is a large surface; a big press scale would feel loose. */
		transition: transform 160ms var(--ease-out);
	}

	.tile:active {
		transform: scale(0.99);
	}

	.shot {
		display: block;
		width: 100%;
		height: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		/* Thumbnails crop; the lightbox shows the whole frame. */
		transition: transform 400ms var(--ease-out);
	}

	/* ---- Always-on short label ------------------------------------------- */
	.chip {
		position: absolute;
		left: 12px;
		bottom: 12px;
		max-width: calc(100% - 24px);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		pointer-events: none;
		background: var(--color-ink);
		color: var(--color-dust-soft);
		padding: 6px 10px;
		font-family: var(--font-mono);
		font-size: 10.5px;
		letter-spacing: 0.1em;
		transition:
			opacity 200ms ease,
			transform 200ms var(--ease-out);
	}

	/* ---- Hover / focus caption ------------------------------------------- */
	.veil {
		position: absolute;
		inset: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 10px;
		padding: 16px;
		pointer-events: none;
		background: linear-gradient(to top, rgb(27 25 23 / 0.94), rgb(27 25 23 / 0.72));
		color: var(--color-bone);
		opacity: 0;
		transition:
			opacity 200ms var(--ease-out),
			visibility 0s linear 200ms;
		visibility: hidden;
	}

	.veil-text {
		font-size: 13px;
		line-height: 1.6;
		/* Long captions stay inside the tile rather than pushing it open. */
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 6;
		line-clamp: 6;
		transform: translateY(6px);
		transition: transform 240ms var(--ease-out);
	}

	.veil-hint {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-taupe);
	}

	/* Keyboard focus gets exactly what the mouse gets. */
	.tile-figure:focus-within .veil {
		opacity: 1;
		visibility: visible;
		transition:
			opacity 200ms var(--ease-out),
			visibility 0s;
	}

	.tile-figure:focus-within .veil-text {
		transform: translateY(0);
	}

	.tile-figure:focus-within .chip {
		opacity: 0;
	}

	@media (hover: hover) and (pointer: fine) {
		.tile-figure:hover .veil {
			opacity: 1;
			visibility: visible;
			transition:
				opacity 200ms var(--ease-out),
				visibility 0s;
		}

		.tile-figure:hover .veil-text {
			transform: translateY(0);
		}

		.tile-figure:hover .chip {
			opacity: 0;
		}

		.tile-figure:hover .shot {
			transform: scale(1.04);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tile,
		.shot,
		.veil-text {
			transition: none;
			transform: none;
		}

		.tile:active {
			transform: none;
		}

		.tile-figure:focus-within .shot,
		.tile-figure:hover .shot {
			transform: none;
		}
	}
</style>
