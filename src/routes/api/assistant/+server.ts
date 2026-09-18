import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { answerWithGroq, type ChatMessage } from '$lib/server/assistant';

/**
 * The assistant's only backend seam.
 *
 * Answers come from Groq when GROQ_API_KEY is set, and from the deterministic
 * lookup in `content/assistant.ts` otherwise (or if the Groq call fails) —
 * see `$lib/server/assistant`. The request/response shape here is what the
 * UI depends on, not the implementation behind it.
 */
export const POST: RequestHandler = async ({ request }) => {
	let body: unknown;

	try {
		body = await request.json();
	} catch {
		error(400, 'Expected a JSON body.');
	}

	const message = (body as { message?: unknown })?.message;

	if (typeof message !== 'string' || !message.trim()) {
		error(400, 'Ask a question.');
	}

	const historyRaw = (body as { history?: unknown })?.history;
	const history: ChatMessage[] = Array.isArray(historyRaw)
		? historyRaw
				.filter(
					(entry): entry is ChatMessage =>
						!!entry &&
						typeof entry === 'object' &&
						(entry.role === 'visitor' || entry.role === 'assistant') &&
						typeof entry.text === 'string'
				)
				.slice(-6)
		: [];

	const answer = await answerWithGroq(message.trim().slice(0, 1000), history);

	return json(answer);
};
