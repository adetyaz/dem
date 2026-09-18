import type { RequestHandler } from './$types';
import { site } from '$lib/site';
import { serviceGroups } from '$lib/content/services';
import { entries } from '$lib/content/assistant';

/**
 * llms.txt — an emerging, unofficial convention (llmstxt.org) for a plain
 * markdown summary AI tools can read directly instead of parsing HTML. It is
 * not a proven or guaranteed-supported standard the way robots.txt and
 * sitemap.xml are; treat it as a low-cost bet, not a ranking lever.
 *
 * Built from the same content the site itself renders from — services,
 * facts, and the assistant's Q&A — so there is one set of facts to keep
 * accurate, not a second copy that drifts.
 */
export const GET: RequestHandler = async () => {
	const services = serviceGroups
		.map((group) => `- **${group.title}**: ${group.summary}`)
		.join('\n');

	const faq = entries.map((entry) => `- **${entry.question}** ${entry.answer}`).join('\n');

	const body = `# ${site.name}

> ${site.tagline} Boundary, ALTA-ACSM title, topographic, construction and pipeline surveys, delivered by licensed professionals.

Licensed Pennsylvania land surveying firm in Brookville, founded in ${site.founded} by ${site.founder}. Most boundary and construction work is in the surrounding western Pennsylvania counties (Jefferson, Clarion, Elk and neighbours); pipeline and energy survey work is taken statewide across Pennsylvania.

## Pages

- [Home](${site.url}/): Services overview, capabilities, recent project work, and a quote request form.
- [About](${site.url}/about): Firm history, staff, office photos, and the equipment carried into the field.
- [Contact](${site.url}/contact): Phone, email, office address, directions, and a Q&A assistant.

## Facts

- Founded: ${site.founded}, by ${site.founder}
- Office: ${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}
- Phone: ${site.phone.label}
- Email: ${site.email.principal}, ${site.email.associate}
- Credentials: ${site.credentials}

## Services

${services}

## Frequently asked

${faq}
`;

	return new Response(body, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'max-age=0, s-maxage=86400'
		}
	});
};
