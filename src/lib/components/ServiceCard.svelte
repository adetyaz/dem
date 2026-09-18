<script lang="ts">
	import type { ServiceGroup } from '$lib/content/services';

	let { group }: { group: ServiceGroup } = $props();
</script>

<!--
	Not a link — there is no per-service page — so the only hover is the
	border colour the 2A canvas specifies. No lift: a card that rises under the
	cursor promises a click it cannot honour.
-->
<div class="card">
	<div class="mb-2 font-mono text-[11px] tracking-[0.06em] text-taupe-deep">{group.index}</div>
	<h3 class="mb-2 text-base font-semibold">{group.title}</h3>
	<p class="m-0 text-[13px] leading-[1.65] text-prose">{group.summary}</p>
</div>

<style>
	.card {
		background: #fff;
		border: 1px solid var(--color-bone-line);
		border-radius: 10px;
		padding: 20px;
		height: 100%;
		transition: border-color 200ms ease;
	}

	@media (hover: hover) and (pointer: fine) {
		.card:hover {
			border-color: var(--color-taupe);
		}
	}
</style>
