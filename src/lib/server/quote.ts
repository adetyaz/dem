import { env } from '$env/dynamic/private';
import { surveyTypes, timingOptions } from '$lib/content/services';

import type { QuoteRequest, QuoteErrors } from '$lib/quote';

export type { QuoteRequest, QuoteErrors };

const MAX = { name: 120, phone: 40, email: 160, county: 80, location: 200, details: 4000 };

function field(data: FormData, key: string, limit: number): string {
	const raw = data.get(key);
	return typeof raw === 'string' ? raw.trim().slice(0, limit) : '';
}

/**
 * Reads and checks a submission. Errors are keyed by field so the form can
 * put each message next to the input it belongs to.
 */
export function parseQuoteRequest(data: FormData): {
	values: QuoteRequest;
	errors: QuoteErrors;
} {
	const values: QuoteRequest = {
		name: field(data, 'name', MAX.name),
		phone: field(data, 'phone', MAX.phone),
		email: field(data, 'email', MAX.email),
		county: field(data, 'county', MAX.county),
		surveyType: field(data, 'surveyType', 80),
		timing: field(data, 'timing', 80),
		location: field(data, 'location', MAX.location),
		details: field(data, 'details', MAX.details)
	};

	const errors: QuoteErrors = {};

	if (!values.name) errors.name = 'Add a name so we know who to call back.';

	// A surveyor has to be able to reach the caller; either channel will do.
	if (!values.phone && !values.email) {
		errors.phone = 'Add a phone number or an email address.';
	}

	if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
		errors.email = 'Check this email address.';
	}

	if (
		values.surveyType &&
		!surveyTypes.includes(values.surveyType as (typeof surveyTypes)[number])
	) {
		errors.surveyType = 'Pick one of the listed survey types.';
	}

	if (values.timing && !timingOptions.includes(values.timing as (typeof timingOptions)[number])) {
		errors.timing = 'Pick one of the listed timings.';
	}

	return { values, errors };
}

function asText(req: QuoteRequest): string {
	return [
		`Name:            ${req.name}`,
		`Phone:           ${req.phone || '—'}`,
		`Email:           ${req.email || '—'}`,
		`County:          ${req.county || '—'}`,
		`Survey type:     ${req.surveyType || '—'}`,
		`Timing:          ${req.timing || '—'}`,
		`Location:        ${req.location || '—'}`,
		'',
		'Details',
		'-------',
		req.details || '—'
	].join('\n');
}

/**
 * Sends the request to the office.
 *
 * Transport is a plain webhook: POST the submission as JSON to
 * QUOTE_WEBHOOK_URL. Point it at whatever you already use — a Slack or
 * Discord incoming webhook, a Zapier/Make/n8n trigger, or your own endpoint —
 * no vendor SDK, no account to set up.
 *
 * With no URL set, this logs the submission instead, so the form works out
 * of the box with nothing configured.
 */
export async function deliverQuoteRequest(req: QuoteRequest, fetchFn: typeof fetch = fetch) {
	const url = env.QUOTE_WEBHOOK_URL;

	if (!url) {
		console.info(`[quote] QUOTE_WEBHOOK_URL not set; logging instead.\n${asText(req)}`);
		return;
	}

	const response = await fetchFn(url, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ ...req, text: asText(req), submittedAt: new Date().toISOString() })
	});

	if (!response.ok) {
		throw new Error(`Webhook rejected the request (${response.status}): ${await response.text()}`);
	}
}
