<script lang="ts">
	import type { Photo } from '$lib/content/photos';
	import { reveal } from '$lib/attachments/reveal';
	import PhotoTile from './PhotoTile.svelte';
	import Lightbox from './Lightbox.svelte';

	type Props = {
		photos: Photo[];
		/** Columns at the widest breakpoint. */
		columns?: 2 | 3 | 4;
		class?: string;
	};

	let { photos, columns = 3, class: klass = '' }: Props = $props();

	/** Full literals so Tailwind can see them. */
	const columnClass = $derived(
		{
			2: 'sm:grid-cols-2',
			3: 'sm:grid-cols-2 lg:grid-cols-3',
			4: 'sm:grid-cols-2 lg:grid-cols-4'
		}[columns]
	);

	let openIndex = $state<number | null>(null);
</script>

<div class="grid grid-cols-1 gap-4 {columnClass} {klass}">
	{#each photos as photo, i (photo.src)}
		<div class="reveal" data-reveal="pending" {@attach reveal(i * 50)}>
			<PhotoTile {photo} onopen={() => (openIndex = i)} />
		</div>
	{/each}
</div>

<Lightbox
	{photos}
	index={openIndex}
	onclose={() => (openIndex = null)}
	onindex={(next) => (openIndex = next)}
/>
