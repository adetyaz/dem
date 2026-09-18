import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { site } from '$lib/site';
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
 * Transport is Resend's HTTP API, which needs no dependency. Configure:
 *   RESEND_API_KEY   — required in production
 *   QUOTE_INBOX      — where requests land (defaults to the principal)
 *   QUOTE_FROM       — a verified sender on your Resend domain
 *
 * With no key set this logs in dev so the form is testable offline, and
 * throws in production rather than silently swallowing a lead.
 */
export async function deliverQuoteRequest(req: QuoteRequest, fetchFn: typeof fetch = fetch) {
	const apiKey = env.RESEND_API_KEY;
	const to = env.QUOTE_INBOX || site.email.principal;
	const from = env.QUOTE_FROM;

	if (!apiKey || !from) {
		if (dev) {
			console.info(`[quote] Not configured; logging instead.\n${asText(req)}`);
			return;
		}
		throw new Error(
			'Quote delivery is not configured. Set RESEND_API_KEY and QUOTE_FROM in the environment.'
		);
	}

	const response = await fetchFn('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			authorization: `Bearer ${apiKey}`,
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			from,
			to: [to],
			reply_to: req.email || undefined,
			subject: `Quote request — ${req.name}${req.county ? `, ${req.county} County` : ''}`,
			text: asText(req)
		})
	});

	if (!response.ok) {
		throw new Error(`Resend rejected the request (${response.status}): ${await response.text()}`);
	}
}
