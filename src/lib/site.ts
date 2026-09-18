/** Firm-wide constants. Single source of truth for anything that appears on
 *  more than one page — address, phone, email, nav. */

export const site = {
	name: 'DEM Surveying, P.C.',
	shortName: 'DEM Surveying',
	// The one place the production domain lives — every canonical URL, the
	// sitemap, Open Graph tags, JSON-LD and llms.txt derive from this.
	// Placeholder until the real domain is confirmed; update here only.
	url: 'https://www.demsurveying.com',
	founded: 1999,
	founder: 'Daniel E. Moore, PLS',
	tagline: 'Professional land surveying in Brookville, Pennsylvania since 1999.',
	phone: { label: '(814) 849-8230', href: 'tel:+18148498230' },
	fax: { label: '(814) 849-0939' },
	email: {
		principal: 'demoore@demsurveying.com',
		associate: 'stkorchak@demsurveying.com'
	},
	address: {
		street: '56 Industrial Park Road, Suite #1',
		city: 'Brookville',
		state: 'PA',
		zip: '15825'
	},
	coordinates: { lat: `41° 09' 47" N`, long: `79° 02' 55" W` },
	// Decimal form of the coordinates above, for JSON-LD's GeoCoordinates.
	geo: { lat: 41.1631, long: -79.0486 },
	facebook: 'https://www.facebook.com/pages/DEM-Surveying-PC/160002874030246',
	credentials:
		'Qualified HUBZone SBC · Professional liability insured · PSLS, NSPS, ACSM, BACC, NFIB'
} as const;

/** `as const` keeps the hrefs literal so `resolve()` accepts them. */
export const navItems = [
	{ label: 'Home', href: '/' },
	{ label: 'Services', href: '/#services' },
	{ label: 'Capabilities', href: '/about#capabilities' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' }
] as const;

export const footerPages = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' }
] as const;

export type NavItem = (typeof navItems)[number] | (typeof footerPages)[number];

/** Which nav item should be marked current for a given pathname. */
export function isCurrent(item: NavItem, pathname: string): boolean {
	const base = (item.href.split('#')[0] || '/') as string;
	if (base === '/') return pathname === '/' && !item.href.includes('#');
	return pathname === base && !item.href.includes('#');
}
