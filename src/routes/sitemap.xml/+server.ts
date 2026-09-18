import type { RequestHandler } from './$types';
import { site } from '$lib/site';

/** Update this when a page's content last meaningfully changed. */
const pages = [
	{ path: '/', priority: '1.0', changefreq: 'monthly' },
	{ path: '/about', priority: '0.8', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.8', changefreq: 'monthly' }
] as const;

export const GET: RequestHandler = async () => {
	const urls = pages
		.map(
			({ path, priority, changefreq }) => `
	<url>
		<loc>${site.url}${path}</loc>
		<changefreq>${changefreq}</changefreq>
		<priority>${priority}</priority>
	</url>`
		)
		.join('');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

	return new Response(body, {
		headers: {
			'content-type': 'application/xml',
			// A day's cache is plenty for a three-page site that rarely changes.
			'cache-control': 'max-age=0, s-maxage=86400'
		}
	});
};
