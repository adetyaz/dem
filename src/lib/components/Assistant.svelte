<script lang="ts">
	import { resolve } from '$app/paths';
	import { tick } from 'svelte';
	import { site } from '$lib/site';
	import { starters } from '$lib/content/assistant';

	type Message = {
		id: number;
		role: 'visitor' | 'assistant';
		text: string;
		handoff?: boolean;
	};

	let { class: klass = '' }: { class?: string } = $props();

	let nextId = 1;
	let messages = $state<Message[]>([
		{
			id: 0,
			role: 'assistant',
			text: 'Ask me about which survey a job needs, what drives the cost, how long work takes, the counties we cover, or what to send us. Anything legal or a firm price goes to a licensed surveyor.'
		}
	]);
	let draft = $state('');
	let pending = $state(false);
	let listEl = $state<HTMLDivElement | null>(null);
	let inputEl = $state<HTMLTextAreaElement | null>(null);

	const canSend = $derived(draft.trim().length > 0 && !pending);
	const showStarters = $derived(messages.length === 1 && !pending);

	// Grow the field with its content, to a ceiling, instead of scrolling it.
	$effect(() => {
		void draft;
		if (!inputEl) return;
		inputEl.style.height = 'auto';
		inputEl.style.height = `${Math.min(inputEl.scrollHeight, 120)}px`;
	});

	$effect(() => {
		void messages.length;
		void pending;
		tick().then(() => {
			listEl?.scrollTo({ top: listEl.scrollHeight, behavior: 'smooth' });
		});
	});

	async function send(text: string) {
		const question = text.trim();
		if (!question || pending) return;

		// Sent alongside the question so follow-ups ("what about for that")
		// resolve against the conversation so far, not just the latest line.
		const history = messages.slice(-6).map((m) => ({ role: m.role, text: m.text }));

		messages.push({ id: nextId++, role: 'visitor', text: question });
		draft = '';
		pending = true;

		// A floor on the wait: without it the indicator flashes for a frame on a
		// local lookup, which reads as broken rather than fast.
		const floor = new Promise((resolve) => setTimeout(resolve, 350));

		try {
			const response = await fetch('/api/assistant', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ message: question, history })
			});

			if (!response.ok) throw new Error(String(response.status));

			const answer = (await response.json()) as { text: string; handoff: boolean };
			await floor;
			messages.push({
				id: nextId++,
				role: 'assistant',
				text: answer.text,
				handoff: answer.handoff
			});
		} catch {
			await floor;
			messages.push({
				id: nextId++,
				role: 'assistant',
				handoff: true,
				text: `Something went wrong at my end. The office can answer directly — call ${site.phone.label} or send the details through the quote form.`
			});
		} finally {
			pending = false;
		}
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			send(draft);
		}
	}
</script>

<div class="assistant {klass}">
	<div class="flex items-center gap-2.5 border-b border-bone-line bg-ink px-4 py-3">
		<span class="size-[7px] shrink-0 rounded-full bg-taupe" aria-hidden="true"></span>
		<span class="font-mono text-[11px] tracking-[0.16em] text-dust-soft uppercase">
			Survey assistant
		</span>
	</div>

	<div
		bind:this={listEl}
		class="msg-list flex-1 space-y-3 overflow-y-auto px-4 py-4"
		role="log"
		aria-live="polite"
		aria-label="Conversation with the survey assistant"
	>
		{#each messages as message (message.id)}
			<div class="msg" data-role={message.role}>
				<div class="bubble" data-role={message.role} data-handoff={message.handoff || undefined}>
					{message.text}
				</div>

				{#if message.handoff}
					<div class="mt-2 flex flex-wrap gap-2">
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- tel: is not app navigation -->
						<a href={site.phone.href} class="chip chip-solid">{site.phone.label}</a>
						<a href={resolve('/contact#quote')} class="chip">Request a quote</a>
					</div>
				{/if}
			</div>
		{/each}

		{#if pending}
			<div class="msg" data-role="assistant">
				<div class="bubble" data-role="assistant">
					<span class="sr-only">Working on an answer</span>
					<span class="dots" aria-hidden="true">
						<span></span><span></span><span></span>
					</span>
				</div>
			</div>
		{/if}
	</div>

	{#if showStarters}
		<div class="flex flex-wrap gap-2 px-4 pb-3">
			{#each starters as starter (starter)}
				<button type="button" class="chip" onclick={() => send(starter)}>{starter}</button>
			{/each}
		</div>
	{/if}

	<form
		class="flex items-end gap-2 border-t border-bone-line bg-white px-3 py-3"
		onsubmit={(event) => {
			event.preventDefault();
			send(draft);
		}}
	>
		<label class="sr-only" for="assistant-input">Your question</label>
		<textarea
			bind:this={inputEl}
			bind:value={draft}
			id="assistant-input"
			class="prompt"
			rows="1"
			placeholder="Ask a question…"
			enterkeyhint="send"
			onkeydown={onKeydown}></textarea>
		<button type="submit" class="send" disabled={!canSend} aria-label="Send question">
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
				<path
					d="M8 13V3M8 3 4 7M8 3l4 4"
					stroke="currentColor"
					stroke-width="1.6"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</form>
</div>

<style>
	.assistant {
		display: flex;
		flex-direction: column;
		min-height: 0;
		background: var(--color-bone);
		border: 1px solid var(--color-bone-line);
		border-radius: 10px;
		overflow: hidden;
	}

	.msg-list {
		/* Stops the page behind from scrolling once the log hits its end. */
		overscroll-behavior: contain;
		-webkit-overflow-scrolling: touch;
	}

	.msg[data-role='visitor'] {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.bubble {
		max-width: 88%;
		width: fit-content;
		padding: 11px 13px;
		border-radius: 10px;
		font-size: 13.5px;
		line-height: 1.65;
		white-space: pre-wrap;
	}

	.bubble[data-role='assistant'] {
		background: #fff;
		border: 1px solid var(--color-bone-line);
		color: var(--color-prose);
	}

	.bubble[data-role='visitor'] {
		background: var(--color-ink);
		color: var(--color-bone);
	}

	.bubble[data-handoff] {
		border-left: 2px solid var(--color-taupe);
	}

	/* Entry animation for newly appended messages. @starting-style needs no
	   mount flag; where it is unsupported the message simply appears. */
	@media (prefers-reduced-motion: no-preference) {
		.msg {
			opacity: 1;
			transform: translateY(0);
			transition:
				opacity 250ms var(--ease-out),
				transform 250ms var(--ease-out);

			@starting-style {
				opacity: 0;
				transform: translateY(6px);
			}
		}
	}

	/* ---- Typing indicator ------------------------------------------------ */
	.dots {
		display: inline-flex;
		gap: 4px;
		padding: 2px 0;
	}

	.dots span {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--color-taupe-deep);
		animation: blink 1.1s ease-in-out infinite;
	}

	.dots span:nth-child(2) {
		animation-delay: 160ms;
	}

	.dots span:nth-child(3) {
		animation-delay: 320ms;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 0.25;
		}
		50% {
			opacity: 1;
		}
	}

	/* ---- Chips ----------------------------------------------------------- */
	.chip {
		display: inline-flex;
		align-items: center;
		background: #fff;
		border: 1px solid var(--color-bone-line);
		border-radius: 20px;
		padding: 7px 13px;
		font-family: var(--font-sans);
		font-size: 12.5px;
		color: var(--color-prose);
		cursor: pointer;
		transition:
			border-color 150ms ease,
			background-color 150ms ease,
			transform 160ms var(--ease-out);
	}

	.chip:active {
		transform: scale(0.97);
	}

	.chip-solid {
		background: var(--color-ink);
		border-color: var(--color-ink);
		color: var(--color-bone);
	}

	@media (hover: hover) and (pointer: fine) {
		.chip:hover {
			border-color: var(--color-taupe);
		}

		.chip-solid:hover {
			background: var(--color-taupe);
			border-color: var(--color-taupe);
			color: var(--color-ink);
		}
	}

	/* ---- Composer -------------------------------------------------------- */
	.prompt {
		flex: 1;
		min-width: 0;
		resize: none;
		border: none;
		outline: none;
		background: none;
		font-family: var(--font-sans);
		font-size: 14px;
		line-height: 1.5;
		padding: 9px 4px;
		color: var(--color-ink);
		max-height: 120px;
	}

	.prompt::placeholder {
		color: #9c948a;
	}

	@media (pointer: coarse) {
		.prompt {
			font-size: 16px;
		}
	}

	.send {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		flex-shrink: 0;
		border: none;
		border-radius: 8px;
		background: var(--color-ink);
		color: var(--color-bone);
		cursor: pointer;
		transition:
			transform 160ms var(--ease-out),
			background-color 150ms ease,
			opacity 150ms ease;
	}

	.send svg {
		width: 16px;
		height: 16px;
	}

	.send:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.send:not(:disabled):active {
		transform: scale(0.94);
	}

	@media (hover: hover) and (pointer: fine) {
		.send:not(:disabled):hover {
			background: var(--color-taupe);
			color: var(--color-ink);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.chip:active,
		.send:not(:disabled):active {
			transform: none;
		}

		.dots span {
			animation-duration: 2s;
		}
	}
</style>
