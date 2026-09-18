<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { site, footerPages } from '$lib/site';
	import { container } from '$lib/styles';

	const year = new Date().getFullYear();
</script>

<footer class="bg-ink-deep text-dust">
	<div
		class="{container} grid grid-cols-1 gap-9 py-11 pb-[calc(2.75rem+env(safe-area-inset-bottom))] sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]"
	>
		<div class="flex flex-col gap-3">
			<span class="text-[17px] font-semibold text-bone">{site.name}</span>
			<address class="text-sm leading-[1.7] not-italic">
				{site.address.street}<br />
				{site.address.city}, {site.address.state}
				{site.address.zip}
			</address>
			<span class="font-mono text-[11px] tracking-[0.08em] text-slate-faint">
				{site.coordinates.lat} / {site.coordinates.long}
			</span>
		</div>

		<nav class="flex flex-col gap-2.5 text-sm" aria-label="Footer">
			<span class="text-[11px] tracking-[0.16em] text-taupe uppercase">Pages</span>
			{#each footerPages as item (item.href)}
				<a
					href={resolve(item.href)}
					class="foot-link self-start"
					aria-current={page.url.pathname === item.href ? 'page' : undefined}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="flex flex-col gap-2.5 text-sm">
			<span class="text-[11px] tracking-[0.16em] text-taupe uppercase">Office</span>
			<span class="leading-[1.7]">
				P. <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- tel: is not app navigation --><a
					href={site.phone.href}
					class="foot-link">{site.phone.label}</a
				><br />
				F. {site.fax.label}
			</span>
			<a href="mailto:{site.email.principal}" class="foot-link self-start break-words">
				{site.email.principal}
			</a>
		</div>

		<div class="flex flex-col gap-2.5 text-sm">
			<span class="text-[11px] tracking-[0.16em] text-taupe uppercase">Credentials</span>
			<span class="leading-[1.7]">{site.credentials}</span>
		</div>
	</div>

	<div class="border-t border-ink-line/60">
		<div
			class="{container} flex flex-wrap items-center justify-between gap-3 py-5 font-mono text-[11px] tracking-[0.08em] text-slate-faint"
		>
			<span>&copy; {year} {site.name}</span>
			<span>Est. {site.founded} &middot; Brookville, Pennsylvania</span>
		</div>
	</div>
</footer>

<style>
	.foot-link {
		transition: color 150ms ease;
	}

	.foot-link[aria-current='page'] {
		color: var(--color-taupe);
	}

	@media (hover: hover) and (pointer: fine) {
		.foot-link:hover {
			color: var(--color-taupe);
		}
	}
</style>
