<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '$lib/site';
	import { container } from '$lib/styles';
	import { aboutStats } from '$lib/content/stats';
	import { capabilityGroups } from '$lib/content/capabilities';
	import { people, credentials, memberships } from '$lib/content/team';
	import {
		officePhotos,
		accessPhotos,
		measurementPhotos,
		dataPhotos,
		staffPhoto
	} from '$lib/content/photos';
	import { reveal } from '$lib/attachments/reveal';

	import Eyebrow from '$lib/components/Eyebrow.svelte';
	import Button from '$lib/components/Button.svelte';
	import PhotoPlate from '$lib/components/PhotoPlate.svelte';
	import PhotoGallery from '$lib/components/PhotoGallery.svelte';
	import StatBand from '$lib/components/StatBand.svelte';
	import AssistantDock from '$lib/components/AssistantDock.svelte';

	/** Each equipment group paired with the photographs that show it. */
	const fieldGroups = [
		{ ...capabilityGroups[0], photos: accessPhotos },
		{ ...capabilityGroups[1], photos: measurementPhotos },
		{ ...capabilityGroups[2], photos: dataPhotos }
	];
</script>

<svelte:head>
	<title>About — DEM Surveying, P.C.</title>
	<meta
		name="description"
		content="Providing quality professional services since 1999. Our staff, our Brookville office, and the equipment our crews carry into the field."
	/>
</svelte:head>

<!-- ===================================================================== Hero -->
<section class="bg-ink">
	<div class="mx-auto grid w-full max-w-[1240px] items-center lg:grid-cols-2">
		<div class="gutter flex flex-col gap-5 py-12 lg:py-14 lg:pb-[72px]">
			<div class="hero-step" style="--step-delay: 0ms">
				<Eyebrow>About the firm</Eyebrow>
			</div>

			<h1
				class="hero-step m-0 max-w-[16ch] text-display font-semibold text-balance text-bone"
				style="--step-delay: 60ms"
			>
				Providing Quality Professional Services <span class="text-taupe">Since 1999</span>
			</h1>

			<p
				class="hero-step m-0 max-w-[52ch] text-[15px] leading-[1.8] text-prose-invert"
				style="--step-delay: 120ms"
			>
				Our staff at DEM consists of individuals devoted to providing quality professional services
				to all of our clients. Continuing Education courses are attended frequently to keep abreast
				of new developments in technology.
			</p>

			<div
				class="hero-step flex flex-wrap gap-x-6 gap-y-2 pt-2 font-mono text-[11px] tracking-[0.14em] text-dust-dim uppercase"
				style="--step-delay: 180ms"
			>
				<span>Est. {site.founded}</span>
				<span class="text-taupe" aria-hidden="true">/</span>
				<span>HUBZone certified SBC</span>
				<span class="text-taupe" aria-hidden="true">/</span>
				<span>PSLS &middot; NSPS &middot; ACSM</span>
			</div>
		</div>

		<PhotoPlate
			photo={officePhotos[0]}
			edgeLabel="BROOKVILLE INDUSTRIAL PARK · PA 15825"
			class="min-h-[300px] lg:min-h-[420px]"
		/>
	</div>
</section>

<StatBand stats={aboutStats} label="The firm at a glance" />

<!-- ================================================= Our staff & memberships -->
<section class="{container} grid items-start gap-10 py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
	<div class="reveal flex flex-col gap-4" data-reveal="pending" {@attach reveal()}>
		<Eyebrow tone="light">Our staff</Eyebrow>
		<h2 class="m-0 max-w-[18ch] text-section font-semibold">
			Built On Records, <span class="text-taupe-deep">Field Work</span> And Repeat Clients
		</h2>
		<p class="m-0 max-w-[46ch] text-[15px] leading-[1.85] text-prose">
			Memberships are currently maintained in various professional organizations, and the firm
			invests in continuing education so staff stay current with equipment, software and standards.
		</p>
		<ul class="m-0 flex list-none flex-wrap gap-2.5 p-0 pt-1">
			{#each memberships as item (item)}
				<li
					class="rounded-[20px] border border-bone-line-soft bg-white px-4 py-2.5 text-[13px] text-prose"
				>
					{item}
				</li>
			{/each}
		</ul>
	</div>

	<figure
		class="reveal m-0 overflow-hidden rounded-[10px] border border-bone-line bg-white"
		data-reveal="pending"
		{@attach reveal(80)}
	>
		<img
			class="block aspect-[448/272] w-full object-cover"
			src={staffPhoto.src}
			alt={staffPhoto.alt}
			width={staffPhoto.width}
			height={staffPhoto.height}
			loading="lazy"
			decoding="async"
		/>
		<figcaption
			class="border-t border-bone-line px-5 py-4 font-mono text-[11px] tracking-[0.14em] text-taupe-deep uppercase"
		>
			{staffPhoto.caption}
		</figcaption>
	</figure>
</section>

<!-- =============================================================== The office -->
<section class="{container} flex flex-col gap-8 pb-16 lg:pb-20">
	<div
		class="reveal flex flex-wrap items-end justify-between gap-6"
		data-reveal="pending"
		{@attach reveal()}
	>
		<div class="flex flex-col gap-3.5">
			<Eyebrow tone="light">The office</Eyebrow>
			<h2 class="m-0 max-w-[20ch] text-section font-semibold">
				Opened <span class="text-taupe-deep">June 2006</span>, Built For The Work
			</h2>
		</div>
		<p class="m-0 max-w-[46ch] text-[15px] leading-[1.8] text-prose">
			Our new professional office building provides ample free parking to clients. We are
			conveniently located on the edge of Historic Brookville and just south of Interstate 80, Exit
			81. These photos give a quick glimpse of the office, but we invite you to stop by and meet our
			staff.
		</p>
	</div>

	<PhotoGallery photos={officePhotos} columns={3} />
</section>

<!-- =============================================================== The people -->
<section class="bg-ink text-bone">
	<div class="{container} flex flex-col gap-8 py-16 lg:py-20">
		<div
			class="reveal flex flex-wrap items-end justify-between gap-6"
			data-reveal="pending"
			{@attach reveal()}
		>
			<div class="flex flex-col gap-3.5">
				<Eyebrow>The people</Eyebrow>
				<h2 class="m-0 text-section font-semibold">
					Who You&rsquo;ll <span class="text-taupe">Work With</span>
				</h2>
			</div>
			<p class="m-0 max-w-[42ch] text-[15px] leading-[1.8] text-prose-invert">
				Calls are returned by the people who do the work. Reach either of us directly.
			</p>
		</div>

		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each people as person, i (person.email)}
				<div
					class="reveal overflow-hidden rounded-[10px] border border-ink-line bg-ink-raised"
					data-reveal="pending"
					{@attach reveal(i * 60)}
				>
					<PhotoPlate tone="dark" caption="PORTRAIT — {person.portrait}" class="h-[240px] w-full" />
					<div class="flex flex-col gap-2 p-5 sm:p-[22px]">
						<span class="text-[18px] font-semibold">{person.name}</span>
						<span class="font-mono text-[11px] tracking-[0.14em] text-taupe uppercase"
							>{person.role}</span
						>
						<a href="mailto:{person.email}" class="mail-link mt-1 self-start text-sm break-words">
							{person.email}
						</a>
					</div>
				</div>
			{/each}

			<div
				class="reveal flex flex-col justify-center gap-3.5 rounded-[10px] border border-ink-line bg-ink-raised p-5 sm:p-[26px]"
				data-reveal="pending"
				{@attach reveal(120)}
			>
				<span class="font-mono text-[11px] tracking-[0.14em] text-taupe uppercase">Credentials</span
				>
				<ul
					class="m-0 flex list-none flex-col gap-3 p-0 text-[13.5px] leading-[1.6] text-prose-invert"
				>
					{#each credentials as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- ============================================================= Capabilities -->
<section id="capabilities" class="{container} flex flex-col gap-10 py-16 lg:py-20">
	<div
		class="reveal flex flex-wrap items-end justify-between gap-6"
		data-reveal="pending"
		{@attach reveal()}
	>
		<div class="flex flex-col gap-3.5">
			<Eyebrow tone="light">Equipment &amp; capabilities</Eyebrow>
			<h2 class="m-0 max-w-[20ch] text-section font-semibold">
				What We Carry <span class="text-taupe-deep">Into The Field</span>
			</h2>
		</div>
		<Button href={resolve('/contact#quote')} variant="ink">Request a quote &rarr;</Button>
	</div>

	{#each fieldGroups as group (group.index)}
		<div class="flex flex-col gap-5">
			<div
				class="reveal flex flex-col gap-2 border-t border-bone-line pt-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
				data-reveal="pending"
				{@attach reveal()}
			>
				<div class="flex items-baseline gap-3">
					<span class="font-mono text-[11px] tracking-[0.14em] whitespace-nowrap text-taupe-deep">
						{group.index} / {group.label.toUpperCase()}
					</span>
					<h3 class="m-0 text-[17px] font-semibold">{group.title}</h3>
				</div>
				<p class="m-0 max-w-[58ch] text-[14px] leading-[1.7] text-prose">{group.summary}</p>
			</div>

			<PhotoGallery photos={group.photos} columns={4} />
		</div>
	{/each}
</section>

<!-- ====================================================================== CTA -->
<section class="bg-ink text-bone">
	<div class="{container} flex flex-wrap items-center justify-between gap-7 py-14 lg:py-16">
		<div class="flex flex-col gap-3">
			<h2 class="m-0 max-w-[24ch] text-band font-semibold">
				Have A Parcel, A Plan Set Or A <span class="text-taupe">Deadline?</span>
			</h2>
			<p class="m-0 max-w-[46ch] text-[15px] leading-[1.7] text-prose-invert">
				Send the details, or ask the survey assistant a quick question first. A licensed surveyor
				handles anything it can&rsquo;t.
			</p>
		</div>
		<div class="flex flex-wrap gap-3">
			<Button href={resolve('/contact#quote')} variant="taupe">Request a quote &rarr;</Button>
			<Button href={site.phone.href} variant="outline">{site.phone.label}</Button>
		</div>
	</div>
</section>

<AssistantDock />

<style>
	.mail-link {
		color: var(--color-dust-bright);
		transition: color 150ms ease;
	}

	@media (hover: hover) and (pointer: fine) {
		.mail-link:hover {
			color: var(--color-taupe);
		}
	}
</style>
