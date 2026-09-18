export type Project = {
	kind: string;
	title: string;
	/** Which hatch plate stands in until photography is supplied. */
	plate: 'plate-light' | 'plate-light-2' | 'plate-light-3';
};

export const projects: Project[] = [
	{
		kind: 'Boundary survey',
		title: '148-Acre Timber Tract, Jefferson County',
		plate: 'plate-light'
	},
	{
		kind: 'Pipeline survey',
		title: 'Gathering Line Corridor & Right-of-Way',
		plate: 'plate-light-2'
	},
	{
		kind: 'ALTA-ACSM title',
		title: 'Commercial Site, Brookville Borough',
		plate: 'plate-light-3'
	}
];
