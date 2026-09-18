/** Shared between the form and the server action, so the client never has to
 *  reach into $lib/server (which SvelteKit forbids). */

export type QuoteRequest = {
	name: string;
	phone: string;
	email: string;
	county: string;
	surveyType: string;
	timing: string;
	location: string;
	details: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteRequest, string>>;

/** Shape returned by the `request` action, in either outcome. */
export type QuoteResult = {
	success?: boolean;
	errors?: QuoteErrors;
	values?: Partial<QuoteRequest>;
	formError?: string;
};
