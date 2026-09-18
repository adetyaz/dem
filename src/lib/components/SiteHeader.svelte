<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { MediaQuery } from 'svelte/reactivity';
	import { navItems, isCurrent, site } from '$lib/site';
	import { container } from '$lib/styles';
	import Button from './Button.svelte';

	let open = $state(false);
	let menuButton = $state<HTMLButtonElement | null>(null);

	/** The menu only exists below lg; if the viewport grows past that while it
	 *  is open, close it so the scroll lock cannot strand the page. */
	const desktop = new MediaQuery('(min-width: 1024px)');

	$effect(() => {
		if (desktop.current && open) open = false;
	});

	$effect(() => {
		if (!open) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previous;
		};
	});

	afterNavigate(() => {
		open = false;
	});

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			open = false;
			menuButton?.focus();
		}
	}
</script>

<svelte:window onkeydown={onKeydown} />

<a href="#main" class="skip-link">Skip to content</a>

<header class="sticky top-0 z-40 bg-ink pt-[env(safe-area-inset-top)]">
	<div class="{container} flex items-center justify-between gap-6 py-4 lg:py-[22px]">
		<a href={resolve('/')} class="flex shrink-0 items-center gap-3" aria-label="{site.name}, home">
			<span
				class="flex size-[34px] items-center justify-center rounded-full bg-taupe text-xs font-semibold text-ink"
				aria-hidden="true">DEM</span
			>
			<span class="text-[17px] font-semibold tracking-[-0.01em] text-bone sm:text-[19px]">
				{site.shortName}
			</span>
		</a>

		<nav class="hidden items-center gap-[26px] text-sm lg:flex" aria-label="Primary">
			{#each navItems as item (item.href)}
				<a
					href={resolve(item.href)}
					class="nav-link"
					aria-current={isCurrent(item, page.url.pathname) ? 'page' : undefined}
				>
					{item.label}
				</a>
			{/each}
			<Button href={resolve('/contact#quote')} variant="taupe" size="compact"
				>Request a Quote</Button
			>
		</nav>

		<button
			bind:this={menuButton}
			type="button"
			class="burger lg:hidden"
			aria-expanded={open}
			aria-controls="site-menu"
			onclick={() => (open = !open)}
		>
			<span class="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
			<span class="burger-line burger-line-1" aria-hidden="true"></span>
			<span class="burger-line burger-line-2" aria-hidden="true"></span>
		</button>
	</div>

	<!--
		Kept mounted and toggled by attribute so the transition is interruptible
		(a menu button gets double-tapped), and made inert when closed so its
		links stay out of the tab order.
	-->
	<div id="site-menu" class="menu lg:hidden" data-open={open} inert={!open || undefined}>
		<nav class="{container} flex flex-col gap-1 py-4" aria-label="Primary, mobile">
			{#each navItems as item, i (item.href)}
				<a
					href={resolve(item.href)}
					class="menu-link"
					style="--menu-delay: {i * 35}ms"
					aria-current={isCurrent(item, page.url.pathname) ? 'page' : undefined}
				>
					{item.label}
				</a>
			{/each}
			<div class="mt-3 flex flex-col gap-2.5 border-t border-ink-line pt-4">
				<Button href={resolve('/contact#quote')} variant="taupe">Request a Quote</Button>
				<Button href={site.phone.href} variant="outline">{site.phone.label}</Button>
			</div>
		</nav>
	</div>
</header>

<!-- Sits under the header (z-40) so the menu panel stays above it. -->
<button
	type="button"
	class="backdrop lg:hidden"
	data-open={open}
	tabindex={-1}
	aria-hidden="true"
	onclick={() => (open = false)}
></button>

<style>
	.skip-link {
		position: absolute;
		left: -9999px;
		top: 0;
		z-index: 60;
		background: var(--color-taupe);
		color: var(--color-ink);
		padding: 12px 18px;
		font-size: 14px;
		font-weight: 500;
	}

	.skip-link:focus {
		left: 0;
	}

	/* ---- Desktop nav link ------------------------------------------------ */
	.nav-link {
		position: relative;
		color: var(--color-dust-soft);
		transition: color 150ms ease;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		inset-inline: 0;
		bottom: -6px;
		height: 1px;
		background: var(--color-taupe);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 200ms var(--ease-out);
	}

	.nav-link[aria-current='page'] {
		color: var(--color-taupe);
	}

	.nav-link[aria-current='page']::after {
		transform: scaleX(1);
	}

	@media (hover: hover) and (pointer: fine) {
		.nav-link:hover {
			color: var(--color-bone);
		}

		.nav-link:hover::after {
			transform: scaleX(1);
		}
	}

	/* ---- Burger ---------------------------------------------------------- */
	.burger {
		position: relative;
		width: 44px;
		height: 44px;
		margin-right: -10px;
		flex-shrink: 0;
		background: none;
		border: none;
		cursor: pointer;
	}

	.burger-line {
		position: absolute;
		left: 12px;
		top: 50%;
		width: 20px;
		height: 1.5px;
		margin-top: -0.75px;
		background: var(--color-bone);
		transition: transform 220ms var(--ease-out);
	}

	.burger-line-1 {
		transform: translateY(-3.5px);
	}

	.burger-line-2 {
		transform: translateY(3.5px);
	}

	.burger[aria-expanded='true'] .burger-line-1 {
		transform: rotate(45deg);
	}

	.burger[aria-expanded='true'] .burger-line-2 {
		transform: rotate(-45deg);
	}

	/* ---- Mobile menu ----------------------------------------------------- */
	.menu {
		position: absolute;
		inset-inline: 0;
		top: 100%;
		background: var(--color-ink);
		border-top: 1px solid var(--color-ink-line);
		padding-bottom: env(safe-area-inset-bottom);
		opacity: 0;
		transform: translateY(-8px);
		visibility: hidden;
		/* Exit is quicker than entry: the system responding should feel
		   snappier than the user deciding. */
		transition:
			opacity 160ms var(--ease-out),
			transform 160ms var(--ease-out),
			visibility 0s linear 160ms;
	}

	.menu[data-open='true'] {
		opacity: 1;
		transform: translateY(0);
		visibility: visible;
		transition:
			opacity 240ms var(--ease-out),
			transform 240ms var(--ease-drawer),
			visibility 0s;
	}

	.menu-link {
		display: block;
		padding: 12px 0;
		font-size: 17px;
		color: var(--color-dust-soft);
		border-bottom: 1px solid var(--color-ink-line);
		opacity: 0;
		transform: translateY(-6px);
		transition:
			color 150ms ease,
			transform 220ms var(--ease-out),
			opacity 220ms var(--ease-out);
	}

	.menu[data-open='true'] .menu-link {
		opacity: 1;
		transform: translateY(0);
		transition-delay: var(--menu-delay, 0ms);
	}

	.menu-link[aria-current='page'],
	.menu-link:active {
		color: var(--color-taupe);
	}

	/* ---- Backdrop -------------------------------------------------------- */
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 30;
		background: rgb(20 18 16 / 0.55);
		opacity: 0;
		visibility: hidden;
		cursor: default;
		transition:
			opacity 160ms ease,
			visibility 0s linear 160ms;
	}

	.backdrop[data-open='true'] {
		opacity: 1;
		visibility: visible;
		transition:
			opacity 240ms ease,
			visibility 0s;
	}

	/* Reduced motion keeps the fade, which aids comprehension, and drops every
	   positional move. */
	@media (prefers-reduced-motion: reduce) {
		.menu,
		.menu[data-open='true'],
		.menu-link,
		.menu[data-open='true'] .menu-link {
			transform: none;
			transition-property: opacity, visibility, color;
		}

		.burger-line {
			transition: none;
		}
	}
</style>
