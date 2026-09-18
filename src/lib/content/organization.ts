import { site } from '$lib/site';
import { officePhotos } from '$lib/content/photos';

/**
 * Sitewide business identity as JSON-LD, rendered once in the root layout so
 * it's on every page. `ProfessionalService` is the closest schema.org type —
 * there is no exact "land surveyor" type, and this is the umbrella local SEO
 * practitioners use for niche professional trades without one.
 *
 * No `logo` field: the firm has no logo graphic (checked — nothing on the
 * live site, no favicon, no CSS background-image). Add one here if that
 * changes; don't invent a placeholder in structured data search engines read
 * as fact.
 */
export const organizationSchema = {
	'@context': 'https://schema.org',
	'@type': 'ProfessionalService',
	'@id': site.url,
	name: site.name,
	description: site.tagline,
	url: site.url,
	image: `${site.url}${officePhotos[0].src}`,
	telephone: site.phone.href.replace('tel:', ''),
	email: site.email.principal,
	faxNumber: site.fax.label,
	address: {
		'@type': 'PostalAddress',
		streetAddress: site.address.street,
		addressLocality: site.address.city,
		addressRegion: site.address.state,
		postalCode: site.address.zip,
		addressCountry: 'US'
	},
	geo: {
		'@type': 'GeoCoordinates',
		latitude: site.geo.lat,
		longitude: site.geo.long
	},
	founder: { '@type': 'Person', name: site.founder },
	foundingDate: String(site.founded),
	areaServed: { '@type': 'State', name: 'Pennsylvania' },
	sameAs: [site.facebook]
};
