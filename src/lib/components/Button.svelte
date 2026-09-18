<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'taupe' | 'outline' | 'ink';
	type Size = 'default' | 'compact';

	type Props = {
		/** Renders an anchor when set, a button otherwise. */
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		variant?: Variant;
		size?: Size;
		disabled?: boolean;
		class?: string;
		children: Snippet;
		[key: string]: unknown;
	};

	let {
		href,
		type = 'button',
		variant = 'taupe',
		size = 'default',
		disabled = false,
		class: klass = '',
		children,
		...rest
	}: Props = $props();
</script>

<!--
	Variants are applied with `class:` directives rather than an interpolated
	string so Svelte's CSS scoper can see them and keeps the rules.
-->
{#if href}
	<!-- href is a passthrough: callers pass resolve()'d paths, or tel:/mailto: -->
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<a
		{href}
		class="btn {klass}"
		class:btn-taupe={variant === 'taupe'}
		class:btn-outline={variant === 'outline'}
		class:btn-ink={variant === 'ink'}
		class:btn-compact={size === 'compact'}
		{...rest}
	>
		{@render children()}
	</a>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
{:else}
	<button
		{type}
		{disabled}
		class="btn {klass}"
		class:btn-taupe={variant === 'taupe'}
		class:btn-outline={variant === 'outline'}
		class:btn-ink={variant === 'ink'}
		class:btn-compact={size === 'compact'}
		{...rest}
	>
		{@render children()}
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.625rem;
		border: 1px solid transparent;
		border-radius: 6px;
		padding: 14px 22px;
		font-family: var(--font-sans);
		font-size: 14px;
		font-weight: 500;
		line-height: 1.25;
		cursor: pointer;
		/* Exact properties, never `all`. Press is the strong ease-out curve;
		   colour settles on plain `ease`. */
		transition:
			transform 160ms var(--ease-out),
			background-color 150ms ease,
			border-color 150ms ease,
			color 150ms ease;
	}

	/* :active is a real press on touch as well as mouse, so it is not gated. */
	.btn:active:not(:disabled) {
		transform: scale(0.97);
	}

	.btn:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}

	.btn-compact {
		padding: 11px 20px;
	}

	.btn-taupe {
		background: var(--color-taupe);
		color: var(--color-ink);
	}

	.btn-outline {
		border-color: var(--color-ink-line-strong);
		color: var(--color-bone);
	}

	.btn-ink {
		background: var(--color-ink);
		color: var(--color-bone);
	}

	@media (hover: hover) and (pointer: fine) {
		.btn-taupe:hover {
			background: var(--color-taupe-bright);
		}

		.btn-outline:hover {
			border-color: var(--color-taupe);
		}

		.btn-ink:hover {
			background: var(--color-taupe);
			color: var(--color-ink);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.btn {
			transition:
				background-color 150ms ease,
				border-color 150ms ease,
				color 150ms ease;
		}

		.btn:active:not(:disabled) {
			transform: none;
		}
	}
</style>
