import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { site } from '$lib/site';
import { entries, answerQuestion, type Answer } from '$lib/content/assistant';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

/** Fast and capable; override with GROQ_MODEL if you'd rather use another. */
const DEFAULT_MODEL = 'openai/gpt-oss-20b';

export type ChatMessage = { role: 'visitor' | 'assistant'; text: string };

/**
 * The deterministic entries in `content/assistant.ts` are already vetted,
 * firm-approved answers — reused here as grounding facts instead of duplicated.
 */
const facts = entries.map((entry) => `- ${entry.answer}`).join('\n');

const systemPrompt = `You are the survey assistant on the ${site.name} website, a licensed Pennsylvania land surveying firm in ${site.address.city}, ${site.address.state}, founded in ${site.founded} by ${site.founder}.

Answer using only the facts below. Keep it to 2-4 short, plain sentences. No markdown, no bullet points, no invented facts.

Never quote a firm price, never rule on a boundary dispute or anything legal, and never promise a specific date. For those — and for anything the facts don't cover — say a licensed surveyor will follow up, and set "handoff" to true.

Office: ${site.phone.label}, ${site.email.principal} / ${site.email.associate}, ${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}.

Facts:
${facts}

Reply with ONLY a JSON object shaped {"text": string, "handoff": boolean}. Nothing else.`;

/**
 * Groq-backed answers, with the deterministic lookup as both the "not
 * configured" default and the fallback if the call fails. The assistant
 * always answers something — it just gets sharper once GROQ_API_KEY is set.
 */
export async function answerWithGroq(message: string, history: ChatMessage[]): Promise<Answer> {
	const apiKey = env.GROQ_API_KEY;
	if (!apiKey) return answerQuestion(message);

	const model = env.GROQ_MODEL || DEFAULT_MODEL;

	const messages = [
		{ role: 'system', content: systemPrompt },
		...history.slice(-6).map((turn) => ({
			role: turn.role === 'visitor' ? 'user' : 'assistant',
			content: turn.text.slice(0, 500)
		})),
		{ role: 'user', content: message }
	];

	try {
		const response = await fetch(GROQ_URL, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${apiKey}`,
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				model,
				messages,
				response_format: { type: 'json_object' },
				temperature: 0.3,
				max_tokens: 400
			})
		});

		if (!response.ok) {
			throw new Error(`Groq responded ${response.status}: ${await response.text()}`);
		}

		const data = await response.json();
		const raw = data?.choices?.[0]?.message?.content;
		if (typeof raw !== 'string') throw new Error('No content in Groq response');

		const parsed = JSON.parse(raw) as { text?: unknown; handoff?: unknown };
		if (typeof parsed.text !== 'string' || !parsed.text.trim()) {
			throw new Error('Malformed Groq JSON');
		}

		return { text: parsed.text.trim(), handoff: parsed.handoff === true };
	} catch (err) {
		// Never let a Groq hiccup take the assistant down — fall back to the
		// deterministic lookup, which always answers something.
		if (dev) console.error('[assistant] Groq call failed, falling back to lookup:', err);
		return answerQuestion(message);
	}
}
