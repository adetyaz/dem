<script lang="ts">
	import type { Photo } from '$lib/content/photos';

	type Props = {
		photos: Photo[];
		/** null when closed. */
		index: number | null;
		onclose: () => void;
		onindex: (next: number) => void;
	};

	let { photos, index, onclose, onindex }: Props = $props();

	let dialogEl = $state<HTMLDialogElement | null>(null);

	const photo = $derived(index === null ? null : (photos[index] ?? null));
	const many = $derived(photos.length > 1);

	// showModal() gives the focus trap, Escape handling, inert background and
	// top-layer painting for free — all the things a hand-rolled modal gets wrong.
	$effect(() => {
		const el = dialogEl;
		if (!el) return;
		if (index !== null && !el.open) el.showModal();
		else if (index === null && el.open) el.close();
	});

	// A modal dialog makes the page inert but does not stop it scrolling.
	$effect(() => {
		if (index === null) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previous;
		};
	});

	function step(delta: number) {
		if (index === null || !many) return;
		onindex((index + delta + photos.length) % photos.length);
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			step(1);
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			step(-1);
		}
	}
</script>

<dialog
	bind:this={dialogEl}
	class="lightbox"
	aria-label="Photo viewer"
	{onclose}
	onkeydown={onKeydown}
	onclick={(event) => {
		// Clicks that land on the dialog itself are clicks outside the sheet.
		if (event.target === dialogEl) onclose();
	}}
>
	{#if photo}
		<div class="sheet">
			<div class="bar">
				<span class="counter">
					{#if many}{String(index! + 1).padStart(2, '0')} / {String(photos.length).padStart(
							2,
							'0'
						)}{/if}
				</span>
				<button type="button" class="icon-btn" onclick={onclose} aria-label="Close photo viewer">
					<svg viewBox="0 0 16 16" aria-hidden="true">
						<path
							d="M4 4l8 8M12 4l-8 8"
							stroke="currentColor"
							stroke-width="1.6"
							stroke-linecap="round"
						/>
					</svg>
				</button>
			</div>

			<div class="frame">
				<!-- No transition on the image itself: prev/next is keyboard-repeatable,
				     and animating a repeated action makes it feel slow. -->
				<img
					class="full"
					src={photo.src}
					alt={photo.alt}
					width={photo.width}
					height={photo.height}
				/>
			</div>

			<div class="foot">
				<p class="caption">{photo.caption}</p>

				{#if many}
					<div class="nav">
						<button
							type="button"
							class="icon-btn"
							onclick={() => step(-1)}
							aria-label="Previous photo"
						>
							<svg viewBox="0 0 16 16" aria-hidden="true">
								<path
									d="M10 3L5 8l5 5"
									fill="none"
									stroke="currentColor"
									stroke-width="1.6"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
						<button type="button" class="icon-btn" onclick={() => step(1)} aria-label="Next photo">
							<svg viewBox="0 0 16 16" aria-hidden="true">
								<path
									d="M6 3l5 5-5 5"
									fill="none"
									stroke="currentColor"
									stroke-width="1.6"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</dialog>

<style>
	.lightbox {
		width: 100vw;
		max-width: 100vw;
		height: 100dvh;
		max-height: 100dvh;
		margin: 0;
		padding: 0;
		border: none;
		background: transparent;
		overflow: hidden;
		/* display and overlay are discrete properties; allow-discrete keeps the
		   dialog painted while the sheet animates out. */
		transition:
			display 240ms allow-discrete,
			overlay 240ms allow-discrete;
	}

	.lightbox[open] {
		display: grid;
		place-items: center;
	}

	.lightbox::backdrop {
		background: rgb(20 18 16 / 0.62);
		/* The blurred backdrop the design calls for. */
		backdrop-filter: blur(14px) saturate(0.85);
		-webkit-backdrop-filter: blur(14px) saturate(0.85);
		opacity: 0;
		transition:
			opacity 240ms var(--ease-out),
			display 240ms allow-discrete,
			overlay 240ms allow-discrete;
	}

	.lightbox[open]::backdrop {
		opacity: 1;

		@starting-style {
			opacity: 0;
		}
	}

	.sheet {
		display: flex;
		flex-direction: column;
		gap: 14px;
		width: min(92vw, 620px);
		max-height: calc(100dvh - 2rem);
		padding: 14px;
		padding-bottom: max(14px, env(safe-area-inset-bottom));
		background: var(--color-ink);
		border: 1px solid var(--color-ink-line);
		border-radius: 12px;
		box-shadow: 0 30px 80px rgb(10 9 8 / 0.6);
		/* Modals are the popover exception: not anchored to a trigger, so they
		   scale from their own centre. */
		transform-origin: center;
		opacity: 0;
		transform: scale(0.96);
		transition:
			opacity 240ms var(--ease-out),
			transform 240ms var(--ease-out);
	}

	.lightbox[open] .sheet {
		opacity: 1;
		transform: scale(1);

		@starting-style {
			opacity: 0;
			transform: scale(0.96);
		}
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		min-height: 32px;
	}

	.counter {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		color: var(--color-dust-dim);
	}

	.frame {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-ink-raised);
		border-radius: 8px;
		overflow: hidden;
		min-height: 0;
	}

	.full {
		display: block;
		width: auto;
		height: auto;
		/* The source photographs top out around 450px wide, so the frame is
		   capped rather than blown up into softness. */
		max-width: 100%;
		max-height: min(62dvh, 460px);
		object-fit: contain;
	}

	.foot {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 16px;
		min-height: 0;
	}

	.caption {
		margin: 0;
		font-size: 13.5px;
		line-height: 1.65;
		color: var(--color-prose-invert);
		overflow-y: auto;
		overscroll-behavior: contain;
		max-height: 8.5rem;
	}

	.nav {
		display: flex;
		gap: 8px;
		flex-shrink: 0;
	}

	.icon-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		flex-shrink: 0;
		border: 1px solid var(--color-ink-line-strong);
		border-radius: 8px;
		background: none;
		color: var(--color-dust-bright);
		cursor: pointer;
		transition:
			transform 160ms var(--ease-out),
			background-color 150ms ease,
			border-color 150ms ease,
			color 150ms ease;
	}

	.icon-btn svg {
		width: 16px;
		height: 16px;
		fill: none;
	}

	.icon-btn:active {
		transform: scale(0.94);
	}

	@media (hover: hover) and (pointer: fine) {
		.icon-btn:hover {
			background: var(--color-taupe);
			border-color: var(--color-taupe);
			color: var(--color-ink);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.sheet,
		.lightbox[open] .sheet {
			transform: none;
			transition: opacity 200ms ease;
		}

		.icon-btn:active {
			transform: none;
		}
	}
</style>
