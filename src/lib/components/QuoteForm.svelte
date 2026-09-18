<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Field from './Field.svelte';
	import Button from './Button.svelte';
	import { surveyTypes, timingOptions } from '$lib/content/services';
	import type { QuoteErrors, QuoteRequest, QuoteResult } from '$lib/quote';

	type Props = {
		/** `compact` is the home band; `full` is the contact page. */
		variant?: 'compact' | 'full';
		/** Where the action lives. The home form posts across to /contact. */
		action?: string;
		/** Server result, used when JavaScript has not taken over yet. */
		result?: QuoteResult | null;
	};

	let { variant = 'compact', action = '/contact?/request', result = null }: Props = $props();

	let status = $state<'idle' | 'submitting' | 'sent'>('idle');
	let clientErrors = $state<QuoteErrors | null>(null);
	let clientFormError = $state<string | undefined>(undefined);
	let formEl = $state<HTMLFormElement | null>(null);
	let resetTimer: ReturnType<typeof setTimeout> | undefined;

	// Client state wins once the form has been submitted with JS; before that
	// the server result seeds it so a no-JS post still shows its errors.
	const errors = $derived(clientErrors ?? result?.errors ?? {});
	const formError = $derived(clientFormError ?? result?.formError);
	const values = $derived(result?.values ?? {});
	const sent = $derived(status === 'sent' || (!clientErrors && result?.success === true));

	$effect(() => () => clearTimeout(resetTimer));

	const submit: SubmitFunction = () => {
		status = 'submitting';
		clientFormError = undefined;

		return async ({ result: outcome }) => {
			if (outcome.type === 'success') {
				clientErrors = {};
				status = 'sent';
				formEl?.reset();
				// Back to idle so a second request is possible without a reload.
				clearTimeout(resetTimer);
				resetTimer = setTimeout(() => (status = 'idle'), 5000);
				return;
			}

			status = 'idle';

			if (outcome.type === 'failure') {
				const data = outcome.data as QuoteResult | undefined;
				clientErrors = data?.errors ?? {};
				clientFormError = data?.formError;
				return;
			}

			clientErrors = {};
			clientFormError =
				'The request could not be sent just now. Please call the office and we will take the details.';
		};
	};

	function fieldValue(key: keyof QuoteRequest) {
		return values[key] ?? '';
	}
</script>

<form bind:this={formEl} method="POST" {action} use:enhance={submit} class="flex flex-col gap-3.5">
	<p class="m-0 text-[13px] leading-[1.6] text-dust">
		A name and one way to reach you is enough to start. The rest helps us scope the work.
	</p>

	<div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
		<Field
			label="Name"
			name="name"
			placeholder="Full name"
			required
			autocomplete="name"
			enterkeyhint="next"
			value={fieldValue('name')}
			error={errors.name}
		/>
		<Field
			label="Phone"
			name="phone"
			type="tel"
			placeholder="(814) 000-0000"
			autocomplete="tel"
			inputmode="tel"
			enterkeyhint="next"
			value={fieldValue('phone')}
			error={errors.phone}
		/>
	</div>

	{#if variant === 'full'}
		<div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
			<Field
				label="Email"
				name="email"
				type="email"
				placeholder="you@company.com"
				autocomplete="email"
				inputmode="email"
				enterkeyhint="next"
				value={fieldValue('email')}
				error={errors.email}
			/>
			<Field
				label="County"
				name="county"
				placeholder="Jefferson, Clarion, Elk…"
				autocomplete="address-level2"
				enterkeyhint="next"
				value={fieldValue('county')}
				error={errors.county}
			/>
		</div>

		<div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
			<Field
				label="Survey type"
				name="surveyType"
				as="select"
				options={surveyTypes}
				value={fieldValue('surveyType')}
				error={errors.surveyType}
			/>
			<Field
				label="Timing"
				name="timing"
				as="select"
				options={timingOptions}
				value={fieldValue('timing')}
				error={errors.timing}
			/>
		</div>

		<Field
			label="Property location"
			name="location"
			placeholder="Township, address, or parcel number"
			enterkeyhint="next"
			value={fieldValue('location')}
			error={errors.location}
		/>
	{:else}
		<div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
			<Field
				label="Survey type"
				name="surveyType"
				as="select"
				options={surveyTypes}
				value={fieldValue('surveyType')}
				error={errors.surveyType}
			/>
			<Field
				label="County"
				name="county"
				placeholder="Jefferson, Clarion, Elk…"
				autocomplete="address-level2"
				enterkeyhint="next"
				value={fieldValue('county')}
				error={errors.county}
			/>
		</div>
	{/if}

	<Field
		label="Details"
		name="details"
		as="textarea"
		rows={4}
		placeholder={variant === 'full'
			? 'Acreage, what the survey is for, anything we should know'
			: 'Acreage, parcel number, deadline, anything we should know'}
		enterkeyhint="done"
		value={fieldValue('details')}
		error={errors.details}
	/>

	<!-- One live region for both outcomes, so a screen reader hears the result
	     without the focus moving. -->
	<p class="status" role="status" aria-live="polite" data-tone={formError ? 'bad' : 'good'}>
		{#if formError}
			{formError}
		{:else if sent}
			Request sent. A licensed surveyor will call you back — usually the same working day.
		{/if}
	</p>

	<Button type="submit" variant="taupe" disabled={status !== 'idle'} class="self-start">
		{@render label()}
	</Button>
</form>

{#snippet label()}
	<!-- Grid stacking keeps the button at the width of its widest label, so it
	     never resizes mid-submit. -->
	<span class="swap" data-status={status}>
		<span class="swap-item swap-idle">Send request &rarr;</span>
		<span class="swap-item swap-busy">Sending&hellip;</span>
		<span class="swap-item swap-done">Request sent</span>
	</span>
{/snippet}

<style>
	.status {
		margin: 0;
		min-height: 0;
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--color-taupe);
		transition: opacity 200ms ease;
	}

	.status:empty {
		display: none;
	}

	.status[data-tone='bad'] {
		color: #e0a97d;
	}

	.swap {
		display: grid;
		align-items: center;
		justify-items: center;
	}

	.swap-item {
		grid-area: 1 / 1;
		white-space: nowrap;
		opacity: 0;
		/* Blur bridges the two labels so the change reads as one word morphing
		   rather than two words crossfading over each other. */
		filter: blur(2px);
		transition:
			opacity 180ms ease,
			filter 180ms ease;
	}

	.swap[data-status='idle'] .swap-idle,
	.swap[data-status='submitting'] .swap-busy,
	.swap[data-status='sent'] .swap-done {
		opacity: 1;
		filter: blur(0);
	}

	@media (prefers-reduced-motion: reduce) {
		.swap-item {
			filter: none;
			transition: opacity 180ms ease;
		}
	}
</style>
