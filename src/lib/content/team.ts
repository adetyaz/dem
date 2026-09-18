import { site } from '$lib/site';

export type Person = {
	name: string;
	role: string;
	email: string;
	portrait: string;
};

export const people: Person[] = [
	{
		name: 'Daniel E. Moore, PLS',
		role: 'Founder · Professional Land Surveyor',
		email: site.email.principal,
		portrait: 'Daniel E. Moore'
	},
	{
		name: 'Steven T. Korchak',
		role: 'Surveying & Project Support',
		email: site.email.associate,
		portrait: 'Steven T. Korchak'
	}
];

/** The firm's own wording, from demsurveying.com/about.html. */
export const credentials: string[] = [
	'Key field personnel are certified with EPA 40-Hour Basic Health & Safety Training complying with 29 CFR 1910.120(e)(3)(I) for work on sites that may be classified as hazardous, including Superfund Sites.',
	'In part to comply with DOT regulations regarding survey work on natural gas pipelines, our office participates in a Drug & Alcohol testing program.',
	'In addition to required commercial or business insurance coverages, D.E.M. carries Professional Liability Insurance.',
	'Qualified HUBZone Small Business Concern, certified 2009.'
];

export const memberships: string[] = [
	'Pennsylvania Society of Land Surveyors',
	'National Society of Professional Surveyors',
	'American Congress on Surveying & Mapping',
	'Brookville Area Chamber of Commerce',
	'National Federation of Independent Business'
];
