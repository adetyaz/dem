<script lang="ts">
	import type { Stat } from '$lib/content/stats';
	import { reveal } from '$lib/attachments/reveal';

	let { stats, label = 'The firm at a glance' }: { stats: Stat[]; label?: string } = $props();
</script>

<!--
	Revealed as one unit rather than cell by cell: the hairlines are the gap
	showing the darker container through, so staggering the cells would flash
	a dark band first.
-->
<section
	aria-label={label}
	class="reveal grid grid-cols-2 gap-px bg-ink/20 md:grid-cols-4"
	data-reveal="pending"
	{@attach reveal()}
>
	{#each stats as stat (stat.label)}
		<div class="flex flex-col gap-1 bg-taupe px-5 py-5 text-ink sm:px-7 sm:py-[22px]">
			<span class="text-[19px] font-semibold sm:text-[22px]">{stat.value}</span>
			<span class="text-[11px] tracking-[0.1em] uppercase sm:text-xs">{stat.label}</span>
		</div>
	{/each}
</section>
