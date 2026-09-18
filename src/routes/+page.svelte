<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '$lib/site';
	import { container } from '$lib/styles';
	import { serviceGroups } from '$lib/content/services';
	import { capabilityHighlights } from '$lib/content/capabilities';
	import { projects } from '$lib/content/projects';
	import { officePhotos, accessPhotos, measurementPhotos, dataPhotos } from '$lib/content/photos';
	import { homeStats } from '$lib/content/stats';
	import { reveal } from '$lib/attachments/reveal';

	import Eyebrow from '$lib/components/Eyebrow.svelte';
	import Button from '$lib/components/Button.svelte';
	import PhotoPlate from '$lib/components/PhotoPlate.svelte';
	import HeroGallery from '$lib/components/HeroGallery.svelte';
	import ShareControl from '$lib/components/ShareControl.svelte';
	import StatBand from '$lib/components/StatBand.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import QuoteForm from '$lib/components/QuoteForm.svelte';

	// Edge labels describe what each photograph actually shows, rather than
	// naming a parcel the firm has not confirmed.
	const heroSlides = [
		{ photo: measurementPhotos[2], edgeLabel: 'THREE-RECEIVER GPS · STATIC OBSERVATION' },
		{ photo: accessPhotos[0], edgeLabel: 'FOUR-WHEEL-DRIVE FLEET · BROOKVILLE, PA' },
		{ photo: dataPhotos[0], edgeLabel: 'GPS PATHFINDER PROXH · SUB-FOOT GIS' }
	];
</script>

<svelte:head>
	<title>DEM Surveying, P.C. — Land Surveying in Brookville, Pennsylvania</title>
	<meta
		name="description"
		content="Licensed Pennsylvania land surveyors since 1999. Boundary, ALTA-ACSM title, topographic, construction and pipeline surveys, from Brookville."
	/>
</svelte:head>

<!-- ===================================================================== Hero -->
<section class="bg-ink">
	<div class="mx-auto grid w-full max-w-[1240px] lg:grid-cols-[0.82fr_1.18fr]">
		<div class="gutter flex flex-col gap-6 py-12 lg:py-14 lg:pb-[72px]">
			<div class="hero-step" style="--step-delay: 0ms">
				<Eyebrow>Since {site.founded} &middot; Brookville, PA</Eyebrow>
			</div>

			<h1
				class="hero-step m-0 max-w-[11ch] text-display font-semibold text-bone"
				style="--step-delay: 60ms"
			>
				Know Exactly Where Your <span class="text-taupe">Line Falls</span>
			</h1>

			<p
				class="hero-step m-0 max-w-[44ch] text-[15px] leading-[1.75] text-prose-invert"
				style="--step-delay: 120ms"
			>
				{site.name} has provided quality professional land surveying since {site.founded}. Boundary,
				ALTA-ACSM title, topographic, construction and pipeline work, delivered by licensed
				professionals with crews equipped for any terrain in Pennsylvania.
			</p>

			<div class="hero-step flex flex-wrap items-center gap-3" style="--step-delay: 180ms">
				<Button href={resolve('/contact#quote')} variant="taupe">Request a Quote &rarr;</Button>
				<Button href={site.phone.href} variant="outline">{site.phone.label}</Button>
			</div>

			<div
				class="hero-step mt-4 flex items-center border-t border-[#2e2924] pt-5"
				style="--step-delay: 240ms"
			>
				<ShareControl />
			</div>
		</div>

		<!-- Flush to the container edge, as the 2A canvas draws it; full-bleed
		     on phones, which suits the crop. -->
		<HeroGallery slides={heroSlides} class="min-h-[360px] sm:min-h-[440px] lg:min-h-[580px]" />
	</div>
</section>

<StatBand stats={homeStats} />

<!-- ================================================================= Services -->
<section id="services" class="{container} grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
	<div class="flex flex-col gap-5">
		<div class="reveal flex flex-col gap-5" data-reveal="pending" {@attach reveal()}>
			<Eyebrow tone="light">Our Services</Eyebrow>
			<h2 class="m-0 max-w-[16ch] text-section font-semibold">
				Thirteen Services, <span class="text-taupe-deep">One Licensed</span> Crew
			</h2>
			<p class="m-0 max-w-[46ch] text-[15px] leading-[1.75] text-prose">
				Field work through CAD deliverables and color plotting, all handled in-house. From a single
				residential boundary to pipeline corridors and gas well plats.
			</p>
		</div>

		<div class="mt-2 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
			{#each serviceGroups as group, i (group.index)}
				<div class="reveal" data-reveal="pending" {@attach reveal(i * 60)}>
					<ServiceCard {group} />
				</div>
			{/each}
		</div>
	</div>

	<!--
		The canvas stacks three plates at fixed pixel offsets. Percentages against
		a fixed aspect ratio hold that composition at every width instead.
	-->
	<div
		class="reveal relative hidden aspect-[598/520] w-full self-center sm:block"
		data-reveal="pending"
		{@attach reveal(80)}
	>
		<!-- Positioning lives on wrappers: PhotoPlate is always position:relative,
		     so an `absolute` passed through `class` would not win. -->
		<div class="absolute top-0 left-0 h-[82.7%] w-[55.2%]">
			<PhotoPlate framed photo={measurementPhotos[0]} class="h-full w-full" />
		</div>
		<div class="absolute top-[16.5%] left-[48.5%] h-[53.8%] w-[35.1%]">
			<PhotoPlate framed photo={officePhotos[3]} class="h-full w-full" />
		</div>
		<div class="absolute top-[28.8%] left-[75.6%] h-[34.6%] w-[21.7%]">
			<PhotoPlate framed photo={officePhotos[5]} class="h-full w-full" />
		</div>
	</div>

	<!-- Below sm the three-plate stack is too small to read; one plate carries it. -->
	<div class="reveal sm:hidden" data-reveal="pending" {@attach reveal()}>
		<PhotoPlate framed photo={measurementPhotos[0]} class="h-64 w-full" />
	</div>
</section>

<!-- ============================================================= Capabilities -->
<section class="bg-ink text-bone">
	<div class="mx-auto grid w-full max-w-[1240px] lg:grid-cols-[0.9fr_1.1fr]">
		<PhotoPlate
			photo={accessPhotos[0]}
			edgeSide="right"
			edgeLabel="{site.coordinates.lat} · {site.coordinates.long}"
			class="min-h-[300px] lg:min-h-[520px]"
		/>

		<div
			class="gutter reveal flex flex-col gap-5 py-16 lg:py-20"
			data-reveal="pending"
			{@attach reveal()}
		>
			<Eyebrow>Capabilities</Eyebrow>
			<h2 class="m-0 max-w-[17ch] text-section font-semibold">
				Equipped To Reach <span class="text-taupe">Any Site</span> We&rsquo;re Sent To
			</h2>
			<p class="m-0 max-w-[48ch] text-[15px] leading-[1.75] text-prose-invert">
				Four four-wheel-drive vehicles with field equipment, an ATV and trailer for remote parcels,
				and a small boat for hydrographic and water-access-only sites. Measurement runs on an
				electronic total station with data collector and a three-receiver GPS system accurate to 0.5
				cm static, with sub-foot Trimble H-Star&trade; collection for GIS.
			</p>

			<div class="mt-1.5 grid gap-5 sm:grid-cols-2 sm:gap-x-7">
				{#each capabilityHighlights as item (item.title)}
					<div class="border-t border-ink-line pt-3">
						<div class="mb-1.5 text-[15px] font-semibold">{item.title}</div>
						<div class="text-[13px] leading-[1.6] text-dust">{item.body}</div>
					</div>
				{/each}
			</div>

			<div class="mt-3 flex gap-2.5">
				{#each [accessPhotos[1], accessPhotos[2], dataPhotos[1]] as thumb, i (thumb.src)}
					<img
						class="h-[66px] w-[96px] border border-[#423b33] object-cover {i === 2
							? 'hidden sm:block'
							: ''}"
						src={thumb.src}
						alt={thumb.alt}
						width={thumb.width}
						height={thumb.height}
						loading="lazy"
						decoding="async"
					/>
				{/each}
			</div>

			<Button href={resolve('/about#capabilities')} variant="outline" class="mt-3 self-start">
				See the full equipment list &rarr;
			</Button>
		</div>
	</div>
</section>

<!-- ================================================================= Projects -->
<section class="{container} flex flex-col gap-8 py-16 lg:py-20">
	<div
		class="reveal flex flex-col items-center gap-2.5 text-center"
		data-reveal="pending"
		{@attach reveal()}
	>
		<h2 class="m-0 text-section font-semibold">
			Recent <span class="text-taupe-deep">Project Work</span>
		</h2>
		<p class="m-0 max-w-[52ch] text-[15px] leading-[1.7] text-prose">
			A sample of the parcels, corridors and construction sites our crews have documented across
			western Pennsylvania.
		</p>
	</div>

	<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each projects as project, i (project.title)}
			<div class="reveal" data-reveal="pending" {@attach reveal(i * 60)}>
				<ProjectCard {project} />
			</div>
		{/each}
	</div>
</section>

<!-- ==================================================================== About -->
<section class="{container} relative pb-16 lg:pb-20">
	<div class="grid grid-cols-2">
		<PhotoPlate photo={officePhotos[0]} class="h-56 sm:h-72 lg:h-[420px]" />
		<PhotoPlate photo={officePhotos[1]} class="h-56 sm:h-72 lg:h-[420px]" />
	</div>

	<div
		class="reveal relative z-10 mx-auto -mt-12 flex w-[calc(100%-1.5rem)] flex-col gap-4 bg-ink p-7 text-dust-soft sm:p-9 lg:absolute lg:top-[58px] lg:left-1/2 lg:mt-0 lg:w-[560px] lg:-translate-x-1/2 lg:p-10"
		data-reveal="pending"
		{@attach reveal()}
	>
		<h2 class="m-0 text-[28px] font-semibold text-bone sm:text-[32px]">
			About <span class="text-taupe">Us</span>
		</h2>
		<p class="m-0 text-sm leading-[1.8]">
			{site.founder} founded {site.name} in {site.founded} and moved the firm into its current professional
			office in the Brookville Industrial Park in June 2006. The building holds a CAD room laid out for
			multiple drafters, a conference room for reviewing large maps, and a private client meeting office,
			with ample free parking on the edge of historic Brookville.
		</p>
		<p class="m-0 text-sm leading-[1.8]">
			The firm invests in continuing education so staff stay current with surveying technology. Our
			most important asset is our staff.
		</p>
		<Button href={resolve('/about')} variant="taupe" class="mt-1 self-start"
			>Meet the firm &rarr;</Button
		>
	</div>
</section>

<!-- ==================================================================== Quote -->
<section id="quote" class="bg-ink text-bone">
	<div class="{container} grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:py-[72px]">
		<div class="reveal flex flex-col gap-4" data-reveal="pending" {@attach reveal()}>
			<Eyebrow>Request a quote</Eyebrow>
			<h2 class="m-0 text-section font-semibold">
				Start With <span class="text-taupe">The Parcel</span>
			</h2>
			<p class="m-0 max-w-[40ch] text-[15px] leading-[1.75] text-prose-invert">
				Send the basics and a licensed surveyor calls you back with scope and pricing. For urgent
				stake-out work, call the office directly.
			</p>
			<div class="mt-2 flex flex-col gap-2 font-mono text-[13px] text-dust-bright">
				<span>P. {site.phone.label} &middot; F. {site.fax.label}</span>
				<a href="mailto:{site.email.principal}" class="mail-link self-start break-words">
					{site.email.principal}
				</a>
				<a href="mailto:{site.email.associate}" class="mail-link self-start break-words">
					{site.email.associate}
				</a>
			</div>
		</div>

		<QuoteForm variant="compact" action="/contact?/request" />
	</div>
</section>

<style>
	.mail-link {
		transition: color 150ms ease;
	}

	@media (hover: hover) and (pointer: fine) {
		.mail-link:hover {
			color: var(--color-taupe);
		}
	}
</style>
