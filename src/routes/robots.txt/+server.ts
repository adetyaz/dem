import type { RequestHandler } from './$types';
import { site } from '$lib/site';

export const GET: RequestHandler = async () => {
	const body = `# Allow crawling everything — search engines and AI crawlers alike
# (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, and friends).
User-agent: *
Disallow:

Sitemap: ${site.url}/sitemap.xml
`;

	return new Response(body, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'max-age=0, s-maxage=86400'
		}
	});
};
