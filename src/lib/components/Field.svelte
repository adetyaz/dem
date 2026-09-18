<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		label: string;
		name: string;
		as?: 'input' | 'select' | 'textarea';
		type?: 'text' | 'tel' | 'email';
		placeholder?: string;
		required?: boolean;
		value?: string;
		options?: readonly string[];
		rows?: number;
		autocomplete?: HTMLInputAttributes['autocomplete'];
		inputmode?: 'text' | 'tel' | 'email';
		enterkeyhint?: 'next' | 'done' | 'send';
		error?: string;
		class?: string;
	};

	let {
		label,
		name,
		as = 'input',
		type = 'text',
		placeholder,
		required = false,
		value = '',
		options = [],
		rows = 4,
		autocomplete,
		inputmode,
		enterkeyhint,
		error,
		class: klass = ''
	}: Props = $props();

	const id = $derived(`field-${name}`);
	const errorId = $derived(`${id}-error`);
</script>

<div class="flex flex-col gap-[7px] {klass}">
	<label for={id} class="text-[11px] tracking-[0.16em] text-dust uppercase">{label}</label>

	{#if as === 'select'}
		<select {id} {name} class="field" aria-invalid={error ? 'true' : undefined} {required}>
			{#each options as option (option)}
				<option value={option} selected={option === value}>{option}</option>
			{/each}
		</select>
	{:else if as === 'textarea'}
		<textarea
			{id}
			{name}
			{rows}
			{placeholder}
			{required}
			{enterkeyhint}
			class="field resize-y"
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={error ? errorId : undefined}>{value}</textarea
		>
	{:else}
		<input
			{id}
			{name}
			{type}
			{placeholder}
			{required}
			{value}
			{autocomplete}
			{inputmode}
			{enterkeyhint}
			autocapitalize={type === 'email' ? 'none' : undefined}
			autocorrect={type === 'email' ? 'off' : undefined}
			class="field"
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={error ? errorId : undefined}
		/>
	{/if}

	{#if error}
		<p id={errorId} class="m-0 text-[12.5px] text-[#e0a97d]">{error}</p>
	{/if}
</div>

<style>
	.field {
		width: 100%;
		font-family: var(--font-sans);
		font-size: 14px;
		padding: 13px 14px;
		border: 1px solid var(--color-ink-field-line);
		border-radius: 6px;
		background: var(--color-ink-field);
		color: var(--color-bone);
		/* No transform here — a field that moves under the caret is a defect. */
		transition:
			border-color 150ms ease,
			box-shadow 150ms ease;
	}

	.field::placeholder {
		color: var(--color-slate-faint);
	}

	.field:focus {
		outline: none;
		border-color: var(--color-taupe);
		box-shadow: 0 0 0 3px rgb(179 155 125 / 0.22);
	}

	.field[aria-invalid='true'] {
		border-color: #c4794a;
	}

	/* 16px floor on touch so iOS Safari does not zoom the page on focus. */
	@media (pointer: coarse) {
		.field {
			font-size: 16px;
		}
	}
</style>
