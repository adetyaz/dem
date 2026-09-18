<script lang="ts">
	import type { PageProps } from './$types';
	import { site } from '$lib/site';
	import { container } from '$lib/styles';
	import { contactStats } from '$lib/content/stats';
	import { faqSchema } from '$lib/content/assistant';
	import { reveal } from '$lib/attachments/reveal';

	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import Eyebrow from '$lib/components/Eyebrow.svelte';
	import Button from '$lib/components/Button.svelte';
	import StatBand from '$lib/components/StatBand.svelte';
	import Assistant from '$lib/components/Assistant.svelte';
	import QuoteForm from '$lib/components/QuoteForm.svelte';

	let { form }: PageProps = $props();

	const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
		`${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`
	)}`;

	const nearby = [
		'Just south of I-80, Exit 81',
		'Brookville Industrial Park',
		'Ample free parking'
	];
</script>

<Seo
	title="Contact — DEM Surveying, P.C."
	description="Call (814) 849-8230, email Dan or Steve directly, or send parcel details through the quote form. Brookville, Pennsylvania."
/>
<!-- Same facts the assistant answers with, as FAQPage schema — one set of
     vetted Q&A read by both a visitor and a crawler. -->
<JsonLd data={faqSchema} />

<!-- ===================================================================== Hero -->
<section class="bg-ink">
	<div class="{container} grid gap-10 py-12 lg:grid-cols-2 lg:gap-12 lg:py-14 lg:pb-[72px]">
		<div class="flex flex-col gap-5">
			<div class="hero-step" style="--step-delay: 0ms">
				<Eyebrow>Contact</Eyebrow>
			</div>

			<h1
				class="hero-step m-0 max-w-[15ch] text-display font-semibold text-balance text-bone"
				style="--step-delay: 60ms"
			>
				Talk To A <span class="text-taupe">Licensed Surveyor</span>
			</h1>

			<p
				class="hero-step m-0 max-w-[50ch] text-[15px] leading-[1.8] text-prose-invert"
				style="--step-delay: 120ms"
			>
				Call the office, email Dan or Steve directly, or send parcel details through the quote form.
				Field crews are out most days, so a message gets a callback.
			</p>

			<div
				class="hero-step grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 pt-2"
				style="--step-delay: 180ms"
			>
				<div class="flex flex-col gap-1.5 border-t border-ink-line pt-3.5">
					<span class="font-mono text-[10px] tracking-[0.16em] text-dust-dim uppercase">Phone</span>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a href={site.phone.href} class="mail-link text-[19px] font-medium text-bone">
						{site.phone.label}
					</a>
					<span class="text-[13px] text-dust">Fax {site.fax.label}</span>
				</div>

				<div class="flex flex-col gap-1.5 border-t border-ink-line pt-3.5">
					<span class="font-mono text-[10px] tracking-[0.16em] text-dust-dim uppercase">Email</span>
					<a href="mailto:{site.email.principal}" class="mail-link text-sm break-words text-bone">
						{site.email.principal}
					</a>
					<a
						href="mailto:{site.email.associate}"
						class="mail-link text-sm break-words text-dust-bright"
					>
						{site.email.associate}
					</a>
				</div>

				<div class="flex flex-col gap-1.5 border-t border-ink-line pt-3.5">
					<span class="font-mono text-[10px] tracking-[0.16em] text-dust-dim uppercase">Office</span
					>
					<address class="text-sm leading-[1.6] text-bone not-italic">
						{site.address.street}<br />
						{site.address.city}, {site.address.state}
						{site.address.zip}
					</address>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-3.5">
			<!--
				A link out rather than an embedded map: it gives directions without
				loading a third-party tracker on every visit. Swap in an iframe here
				if the firm would rather have the map inline.
			-->
			<a
				href={mapsUrl}
				target="_blank"
				rel="noreferrer"
				class="map plate-dark relative flex min-h-[300px] flex-1 items-end border border-ink-line p-5"
			>
				<span
					class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 font-mono text-[10px] tracking-[0.28em] whitespace-nowrap text-dust"
					style="writing-mode: vertical-rl;"
				>
					{site.coordinates.lat} &middot; {site.coordinates.long}
				</span>
				<span
					class="map-chip bg-ink px-3 py-2 font-mono text-[11px] tracking-[0.1em] text-dust-soft"
				>
					Open in Google Maps &rarr;
				</span>
			</a>

			<ul class="m-0 flex list-none flex-wrap gap-2.5 p-0">
				{#each nearby as item (item)}
					<li
						class="rounded-[20px] border border-ink-line px-4 py-2.5 text-[12.5px] text-dust-bright"
					>
						{item}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<StatBand stats={contactStats} label="Finding the office" />

<!-- ================================================================ Assistant -->
<section class="{container} grid items-start gap-10 py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
	<div class="reveal flex flex-col gap-5" data-reveal="pending" {@attach reveal()}>
		<Eyebrow tone="light">Quick answers</Eyebrow>
		<h2 class="m-0 max-w-[18ch] text-section font-semibold">
			Ask The <span class="text-taupe-deep">Survey Assistant</span>
		</h2>
		<p class="m-0 max-w-[48ch] text-[15px] leading-[1.85] text-prose">
			It handles the questions that come in every week: which survey a job needs, roughly what it
			costs, how long it takes, which counties we work in, office details and what documents to
			send. Terms like ALTA, topo and as-built get plain explanations.
		</p>

		<div class="flex flex-col gap-3 border-t border-bone-line-soft pt-4">
			<span class="font-mono text-[10px] tracking-[0.16em] text-taupe-deep uppercase">
				Where a person takes over
			</span>
			<span class="text-sm leading-[1.75] text-prose">
				Boundary disputes, anything legal, and firm price commitments are answered by {site.founder}
				or Steven T. Korchak. The assistant hands those off with the office number and the quote form.
			</span>
		</div>

		<Button href="#quote" variant="ink" class="self-start">
			Skip ahead to the quote form &rarr;
		</Button>
	</div>

	<div class="reveal" data-reveal="pending" {@attach reveal(80)}>
		<Assistant class="h-[560px] lg:h-[620px]" />
	</div>
</section>

<!-- ==================================================================== Quote -->
<section id="quote" class="bg-ink text-bone">
	<div class="{container} grid gap-10 py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
		<div class="reveal flex flex-col gap-4" data-reveal="pending" {@attach reveal()}>
			<Eyebrow>Request a quote</Eyebrow>
			<h2 class="m-0 text-section font-semibold">
				Start With <span class="text-taupe">The Parcel</span>
			</h2>
			<p class="m-0 max-w-[42ch] text-[15px] leading-[1.8] text-prose-invert">
				Send what you have and a licensed surveyor calls you back with scope and pricing. For urgent
				stake-out work, call the office directly.
			</p>

			<div class="mt-1.5 flex flex-col gap-2.5 font-mono text-[13px] text-dust-bright">
				<span>P. {site.phone.label} &middot; F. {site.fax.label}</span>
				<a href="mailto:{site.email.principal}" class="mail-link self-start break-words">
					{site.email.principal}
				</a>
				<a href="mailto:{site.email.associate}" class="mail-link self-start break-words">
					{site.email.associate}
				</a>
			</div>

			<p class="mt-3 border-t border-ink-line pt-4 text-[13.5px] leading-[1.75] text-dust">
				Helpful to include: your deed, parcel or tax map number, any prior survey or plot plan, and
				a title commitment for ALTA work. An address alone is enough to start.
			</p>
		</div>

		<QuoteForm variant="full" action="?/request" result={form} />
	</div>
</section>

<!-- =============================================================== Directions -->
<section class="{container} grid gap-9 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:py-[72px]">
	<div class="reveal flex flex-col gap-3.5" data-reveal="pending" {@attach reveal()}>
		<span class="font-mono text-[11px] tracking-[0.16em] text-taupe-deep uppercase">Directions</span
		>
		<p class="m-0 text-[15px] leading-[1.85] text-prose">
			From Interstate 80, take Exit 81 and head south into the Brookville Industrial Park. The
			office is at {site.address.street}, on the edge of historic Brookville, with ample free
			parking at the door.
		</p>
	</div>

	<div class="reveal flex flex-col gap-3.5" data-reveal="pending" {@attach reveal(60)}>
		<span class="font-mono text-[11px] tracking-[0.16em] text-taupe-deep uppercase"
			>Coordinates</span
		>
		<p class="m-0 font-mono text-[15px] leading-[1.9]">
			LAT {site.coordinates.lat}<br />
			LONG {site.coordinates.long}
		</p>
	</div>

	<div class="reveal flex flex-col gap-3.5" data-reveal="pending" {@attach reveal(120)}>
		<span class="font-mono text-[11px] tracking-[0.16em] text-taupe-deep uppercase"
			>Also find us</span
		>
		<!-- External site, not app navigation -->
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a
			href={site.facebook}
			target="_blank"
			rel="noreferrer"
			class="foot-out self-start text-[15px] leading-[1.8] text-prose"
		>
			{site.name} on Facebook &rarr;
		</a>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
		<span class="text-sm leading-[1.75] text-prose">
			Member, Brookville Area Chamber of Commerce
		</span>
	</div>
</section>

<style>
	.mail-link,
	.foot-out {
		transition: color 150ms ease;
	}

	.map-chip {
		transition:
			background-color 150ms ease,
			color 150ms ease;
	}

	.map {
		transition: border-color 150ms ease;
	}

	@media (hover: hover) and (pointer: fine) {
		.mail-link:hover,
		.foot-out:hover {
			color: var(--color-taupe);
		}

		.map:hover {
			border-color: var(--color-taupe);
		}

		.map:hover .map-chip {
			background: var(--color-taupe);
			color: var(--color-ink);
		}
	}
</style>
