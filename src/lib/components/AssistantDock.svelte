<script lang="ts">
	import Assistant from './Assistant.svelte';

	let open = $state(false);
	let launcher = $state<HTMLButtonElement | null>(null);
	let panel = $state<HTMLDivElement | null>(null);

	function toggle() {
		open = !open;
		if (open) {
			// Move focus into the panel so the keyboard lands where the eye does.
			requestAnimationFrame(() => panel?.focus());
		}
	}

	function close() {
		if (!open) return;
		open = false;
		launcher?.focus();
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') close();
	}
</script>

<svelte:window onkeydown={onKeydown} />

<!--
	z-20 keeps the dock above page content but below the mobile menu backdrop
	(z-30) and header (z-40), so an open menu dims it like everything else.
-->
<div class="dock">
	<div
		bind:this={panel}
		class="panel"
		data-open={open}
		inert={!open || undefined}
		tabindex="-1"
		role="dialog"
		aria-label="Survey assistant"
	>
		<Assistant class="h-full" />
	</div>

	<button bind:this={launcher} type="button" class="launcher" aria-expanded={open} onclick={toggle}>
		{open ? 'Close assistant' : 'Ask the survey assistant'}
	</button>
</div>

<style>
	.dock {
		position: fixed;
		right: max(1rem, env(safe-area-inset-right));
		bottom: max(1rem, env(safe-area-inset-bottom));
		z-index: 20;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 12px;
	}

	@media (width >= 40rem) {
		.dock {
			right: max(1.5rem, env(safe-area-inset-right));
			bottom: max(1.5rem, env(safe-area-inset-bottom));
		}
	}

	.panel {
		width: 390px;
		max-width: calc(100vw - 2rem);
		/* dvh so the panel tracks the visible area as the URL bar and the
		   software keyboard come and go. */
		height: min(560px, calc(100dvh - 9rem));
		display: flex;
		overflow: hidden;
		border-radius: 12px;
		box-shadow: 0 26px 70px rgb(20 18 16 / 0.45);
		/* Anchored to its trigger, so it scales out of the launcher rather than
		   out of thin air or out of its own centre. */
		transform-origin: bottom right;
		opacity: 0;
		transform: scale(0.96) translateY(8px);
		visibility: hidden;
		transition:
			opacity 160ms var(--ease-out),
			transform 160ms var(--ease-out),
			visibility 0s linear 160ms;
	}

	.panel:focus {
		outline: none;
	}

	.panel[data-open='true'] {
		opacity: 1;
		transform: scale(1) translateY(0);
		visibility: visible;
		transition:
			opacity 220ms var(--ease-out),
			transform 220ms var(--ease-out),
			visibility 0s;
	}

	.launcher {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		align-self: flex-end;
		background: var(--color-taupe);
		color: var(--color-ink);
		border: none;
		border-radius: 30px;
		padding: 14px 20px;
		font-family: var(--font-sans);
		font-size: 13.5px;
		font-weight: 500;
		cursor: pointer;
		box-shadow: 0 14px 34px rgb(20 18 16 / 0.35);
		transition:
			transform 160ms var(--ease-out),
			background-color 150ms ease;
	}

	@media (width >= 40rem) {
		.launcher {
			padding: 15px 22px;
			font-size: 14px;
		}
	}

	.launcher:active {
		transform: scale(0.97);
	}

	@media (hover: hover) and (pointer: fine) {
		.launcher:hover {
			background: var(--color-taupe-bright);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.panel,
		.panel[data-open='true'] {
			transform: none;
			transition-property: opacity, visibility;
		}

		.launcher:active {
			transform: none;
		}
	}
</style>
