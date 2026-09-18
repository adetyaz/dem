<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** `dark` sits on the ink ground, `light` on the bone page. */
		tone?: 'dark' | 'light';
		class?: string;
		children: Snippet;
	};

	let { tone = 'dark', class: klass = '', children }: Props = $props();
</script>

<div class="flex items-center gap-2.5 {klass}">
	<span class="size-[7px] shrink-0 rounded-full bg-taupe"></span>
	<span
		class="text-xs tracking-[0.28em] uppercase {tone === 'dark' ? 'text-taupe' : 'text-taupe-ink'}"
	>
		{@render children()}
	</span>
</div>
