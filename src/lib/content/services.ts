export type ServiceGroup = {
	/** Numerals are real here: the groups run field work → office deliverable. */
	index: string;
	title: string;
	summary: string;
	services: string[];
};

export const serviceGroups: ServiceGroup[] = [
	{
		index: '01',
		title: 'Land & Boundary',
		summary: 'Boundary surveys, ALTA-ACSM land title, sub-divisions, records abstracting.',
		services: [
			'Boundary (property) surveys',
			'ALTA-ACSM land title surveys',
			'Sub-divisions',
			'Boundary records abstracting'
		]
	},
	{
		index: '02',
		title: 'Construction Support',
		summary: 'Stake-out and as-builts, topographic, volumetric and earthwork, control surveys.',
		services: [
			'Construction stake-out and as-builts',
			'Topographic (topo) surveys',
			'Volumetric surveys and earthwork',
			'Control and location surveys'
		]
	},
	{
		index: '03',
		title: 'GPS, GIS & Mapping',
		summary: 'GPS surveying, GIS mapping, AutoCAD® mapping and color plotting.',
		services: ['GPS surveying', 'GIS mapping', 'AutoCAD® mapping and color plotting']
	},
	{
		index: '04',
		title: 'Energy & Specialized',
		summary: 'Gas well plats, pipeline surveys, hazardous sites, hydrographic access.',
		services: ['Gas well plats', 'Pipeline surveys']
	}
];

/** Options offered on the quote form, in the order a caller is likeliest to pick. */
export const surveyTypes = [
	'Boundary / property survey',
	'ALTA-ACSM land title survey',
	'Topographic survey',
	'Construction stake-out or as-built',
	'Sub-division',
	'Gas well plat / pipeline',
	'Hazardous site survey',
	'Not sure yet'
] as const;

export const timingOptions = [
	'No fixed deadline',
	'Within a month',
	'Tied to a closing date',
	'Tied to a permit deadline',
	'Urgent / crew needed on site'
] as const;
