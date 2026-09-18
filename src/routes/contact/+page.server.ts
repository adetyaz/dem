import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { parseQuoteRequest, deliverQuoteRequest } from '$lib/server/quote';
import { site } from '$lib/site';

export const actions: Actions = {
	/**
	 * Shared by both quote forms. The home page posts here with
	 * `action="/contact?/request"`, so there is one validator and one transport.
	 */
	request: async ({ request, fetch }) => {
		const { values, errors } = parseQuoteRequest(await request.formData());

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values });
		}

		try {
			await deliverQuoteRequest(values, fetch);
		} catch (error) {
			// Never lose a lead silently: log it here so it can be recovered.
			console.error('[quote] delivery failed', error, values);
			return fail(502, {
				values,
				formError: `The request could not be sent just now. Please call the office on ${site.phone.label} and we will take the details.`
			});
		}

		return { success: true };
	}
};
