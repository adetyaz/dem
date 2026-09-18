export type CapabilityGroup = {
	index: string;
	label: string;
	title: string;
	/** One scannable line; the photo captions carry the detail. */
	summary: string;
};

/** Ordered the way a job actually runs: reach the parcel, measure it, draw it. */
export const capabilityGroups: CapabilityGroup[] = [
	{
		index: '01',
		label: 'Access',
		title: 'Getting to the parcel',
		summary:
			'Four four-wheel-drive vehicles, an ATV and trailer for remote ground, a small boat for water-access-only sites, and a metal detector for buried markers.'
	},
	{
		index: '02',
		label: 'Measurement',
		title: 'Instruments',
		summary:
			'An electronic total station with data collector and prism assembly, and a three-receiver GPS survey system accurate to 0.5 cm static.'
	},
	{
		index: '03',
		label: 'Field to CAD',
		title: 'Data handling',
		summary:
			'Sub-foot GPS and GIS collection postprocessed in GPS Pathfinder Office, downloaded straight into AutoCAD® for mapping and color plotting in-house.'
	}
];

/** The two-up summary used on the home page capabilities band. */
export const capabilityHighlights = [
	{
		title: 'Field to CAD',
		body: 'Data collector downloads straight into CAD; Recon™ handheld postprocessed in Pathfinder Office.'
	},
	{
		title: 'Compliance',
		body: 'Professional liability insured, DOT-compliant drug & alcohol program for pipeline work.'
	}
];
