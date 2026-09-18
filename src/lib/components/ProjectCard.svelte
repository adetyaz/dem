<script lang="ts">
	import type { Project } from '$lib/content/projects';

	let { project }: { project: Project } = $props();
</script>

<!--
	Static by design. These do not link anywhere yet, so there is no hover
	motion to promise a click. Add one alongside the href if project pages land.
-->
<article
	class="relative flex h-[260px] flex-col justify-end overflow-hidden rounded-[10px] p-5 sm:h-[300px]"
>
	<span class="absolute inset-0 {project.plate}" aria-hidden="true"></span>
	<span class="absolute inset-0 bg-linear-to-t from-ink/85 to-transparent to-55%" aria-hidden="true"
	></span>
	<span class="relative font-mono text-[10px] tracking-[0.16em] text-[#d9cfbe] uppercase">
		{project.kind}
	</span>
	<h3 class="relative mt-1.5 text-[17px] font-semibold text-white">{project.title}</h3>
</article>
