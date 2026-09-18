<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/site';

	type Status = 'idle' | 'shared' | 'copied' | 'failed';

	let status = $state<Status>('idle');
	let timer: ReturnType<typeof setTimeout> | undefined;

	const label = $derived(
		{ idle: 'Share', shared: 'Shared', copied: 'Link copied', failed: 'Copy failed' }[status]
	);

	function flash(next: Status) {
		status = next;
		clearTimeout(timer);
		timer = setTimeout(() => (status = 'idle'), 2400);
	}

	$effect(() => () => clearTimeout(timer));

	async function share() {
		const url = page.url.href;

		if (navigator.share) {
			try {
				await navigator.share({ title: site.name, text: site.tagline, url });
				flash('shared');
				return;
			} catch (error) {
				// Dismissing the share sheet is a choice, not a failure.
				if (error instanceof Error && error.name === 'AbortError') return;
			}
		}

		try {
			await navigator.clipboard.writeText(url);
			flash('copied');
		} catch {
			flash('failed');
		}
	}
</script>

<button type="button" class="share" data-state={status} onclick={share}>
	<span class="glyph" aria-hidden="true">
		<span class="glyph-mark glyph-plus">+</span>
		<span class="glyph-mark glyph-check">
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
				<path
					d="M3.5 8.5 6.5 11.5 12.5 5"
					stroke="currentColor"
					stroke-width="1.6"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</span>
	</span>
	<span class="label">{label}</span>
</button>

<style>
	.share {
		display: inline-flex;
		align-items: center;
		gap: 14px;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-dust-dim);
		transition:
			color 150ms ease,
			transform 160ms var(--ease-out);
	}

	.share:active {
		transform: scale(0.97);
	}

	.glyph {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		flex-shrink: 0;
		border: 1px solid var(--color-ink-line-strong);
		border-radius: 50%;
		color: var(--color-taupe);
		transition: border-color 150ms ease;
	}

	.glyph-mark {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		line-height: 1;
		/* Blur bridges the two glyphs so the swap reads as one mark changing
		   rather than two objects overlapping. */
		transition:
			opacity 180ms ease,
			filter 180ms ease;
	}

	.glyph-check svg {
		width: 15px;
		height: 15px;
	}

	.glyph-check {
		opacity: 0;
		filter: blur(3px);
	}

	.share[data-state='shared'] .glyph-plus,
	.share[data-state='copied'] .glyph-plus {
		opacity: 0;
		filter: blur(3px);
	}

	.share[data-state='shared'] .glyph-check,
	.share[data-state='copied'] .glyph-check {
		opacity: 1;
		filter: blur(0);
	}

	.share[data-state='shared'],
	.share[data-state='copied'] {
		color: var(--color-taupe);
	}

	.label {
		transition: color 150ms ease;
	}

	@media (hover: hover) and (pointer: fine) {
		.share:hover {
			color: var(--color-dust-bright);
		}

		.share:hover .glyph {
			border-color: var(--color-taupe);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.share {
			transition: color 150ms ease;
		}

		.share:active {
			transform: none;
		}

		.glyph-mark {
			transition: opacity 180ms ease;
			filter: none;
		}

		.glyph-check {
			filter: none;
		}

		.share[data-state='shared'] .glyph-plus,
		.share[data-state='copied'] .glyph-plus {
			filter: none;
		}
	}
</style>
