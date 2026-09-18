import { site } from '$lib/site';

/**
 * The survey assistant's knowledge.
 *
 * Deliberately deterministic. This is a licensed professional firm, and the
 * page copy promises that boundary disputes, anything legal, and firm price
 * commitments go to Daniel E. Moore, PLS or Steven T. Korchak. A lookup over
 * the firm's own facts keeps that promise; a generative model would need
 * guardrails before it could. `answerQuestion` is the seam: swap its body for
 * a model call and the UI and endpoint stay as they are.
 */

export type Entry = {
	id: string;
	/** Lower-case terms; a question matches on how many it contains. */
	keywords: string[];
	answer: string;
	/** True when the honest answer is "a person should take this". */
	handoff?: boolean;
};

const office = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;

export const entries: Entry[] = [
	{
		id: 'which-survey',
		keywords: ['which survey', 'what survey', 'what kind', 'what type', 'need', 'recommend'],
		answer:
			'It depends on what the survey has to prove. Buying or selling, or settling where a line runs: a boundary (property) survey. A commercial closing or a lender that follows national standards: an ALTA-ACSM land title survey. Grading, drainage or design work: a topographic survey. Building something: construction stake-out, then an as-built when it is finished. Splitting a parcel: a sub-division. If you tell me what the survey is for, I can point you at the right one — and the quote form has a "Not sure yet" option that a surveyor will sort out.'
	},
	{
		id: 'cost',
		keywords: ['cost', 'price', 'pricing', 'quote', 'how much', 'fee', 'estimate', 'expensive'],
		answer: `Price turns on acreage, how many corners have to be set, how much record research the deed history needs, terrain and access, and the deadline. Because those vary so much, a fee is quoted per parcel rather than from a table — and only a licensed surveyor here commits to one. Send the parcel details through the quote form, or call ${site.phone.label}, and you will get scope and pricing back.`,
		handoff: true
	},
	{
		id: 'timeline',
		keywords: ['how long', 'timeline', 'turnaround', 'when', 'schedule', 'lead time', 'fast'],
		answer: `Timing depends on the current field schedule, how quickly the county records come back, and the season — leaf cover and snow both slow field work. Work tied to a closing or a permit deadline gets scheduled around that date, so say so when you ask. For urgent stake-out, call the office directly on ${site.phone.label} rather than using the form.`
	},
	{
		id: 'area',
		keywords: ['county', 'counties', 'area', 'where', 'region', 'travel', 'location', 'serve'],
		answer: `The office is in Brookville, Jefferson County, and most boundary and construction work is in the surrounding western Pennsylvania counties — Jefferson, Clarion, Elk and their neighbours. Pipeline and energy survey work is taken statewide across Pennsylvania. If you are unsure whether your parcel is in range, give the township and county and the office will tell you straight.`
	},
	{
		id: 'office',
		keywords: ['office', 'address', 'directions', 'visit', 'parking', 'phone', 'email', 'contact'],
		answer: `The office is at ${office} — from Interstate 80 take Exit 81 and head south into the Brookville Industrial Park. There is ample free parking at the door. Phone ${site.phone.label}, fax ${site.fax.label}, and email ${site.email.principal} or ${site.email.associate}.`
	},
	{
		id: 'documents',
		keywords: ['document', 'documents', 'send', 'bring', 'deed', 'paperwork', 'need from me'],
		answer:
			'Helpful to include: your deed, the parcel or tax map number, any prior survey or plot plan you have, and a title commitment if the job is ALTA work. None of it is essential to start — an address alone is enough to open a file.'
	},
	{
		id: 'alta',
		keywords: ['alta', 'acsm', 'title survey', 'land title'],
		answer:
			'An ALTA-ACSM land title survey is the detailed survey commercial lenders and title insurers ask for. It goes further than a boundary survey: it maps improvements, easements, rights-of-way and encroachments, and ties them to the exceptions listed in the title commitment, all to a national standard. It is usually what a commercial closing needs.'
	},
	{
		id: 'topo',
		keywords: ['topo', 'topographic', 'contour', 'elevation', 'grading'],
		answer:
			'A topographic survey maps the shape of the ground — elevations and contours — plus the features on it, such as buildings, pavement, tree lines and utilities. Engineers and architects design from it: grading, drainage and site layout all start with a topo.'
	},
	{
		id: 'as-built',
		keywords: ['as built', 'as-built', 'asbuilt', 'stake out', 'stake-out', 'staking', 'layout'],
		answer:
			'Two halves of the same job. Construction stake-out puts the design on the ground before you build: marks the crew builds to. An as-built records what was actually built once it is finished, which is what permits, lenders and owners normally want for the file.'
	},
	{
		id: 'equipment',
		keywords: ['equipment', 'gps', 'accuracy', 'total station', 'instrument', 'drone', 'accurate'],
		answer:
			'Field work runs on an electronic total station with a data collector and a three-receiver GPS survey system accurate to 0.5 cm static, with Trimble H-Star™ collection to sub-foot for GIS. Access is four four-wheel-drive vehicles, an ATV and trailer for remote parcels, and a small boat for hydrographic and water-access-only sites. Field data downloads straight into CAD at the office, and mapping and colour plotting are done in-house.'
	},
	{
		id: 'credentials',
		keywords: ['licensed', 'insured', 'insurance', 'certified', 'hubzone', 'credential', 'safety'],
		answer:
			'DEM Surveying, P.C. is a licensed Pennsylvania surveying firm founded in 1999 by Daniel E. Moore, PLS. It is a qualified HUBZone Small Business Concern, certified in 2009, and carries professional liability insurance. Field staff hold EPA 40-Hour Basic Health & Safety Training for hazardous and Superfund sites, and the firm takes part in a DOT-compliant drug and alcohol testing program for pipeline work.'
	},
	{
		id: 'dispute',
		keywords: [
			'dispute',
			'neighbour',
			'neighbor',
			'fence',
			'encroach',
			'lawyer',
			'legal',
			'court',
			'sue',
			'trespass',
			'adverse possession'
		],
		answer: `That one needs a licensed surveyor, not me — where a disputed line falls, and what it means, is a professional judgement and often a legal one. Call the office on ${site.phone.label} and ask for Daniel E. Moore, PLS or Steven T. Korchak, or send the parcel details through the quote form and someone will call you back.`,
		handoff: true
	}
];

/** Suggested openers, shown before the visitor has typed anything. */
export const starters = [
	'Which survey do I need?',
	'What drives the cost?',
	'Which counties do you cover?',
	'What is an ALTA survey?'
];

export type Answer = { text: string; handoff: boolean };

const FALLBACK: Answer = {
	text: `I do not have a good answer for that one. The people who do are Daniel E. Moore, PLS and Steven T. Korchak — call ${site.phone.label}, email ${site.email.principal}, or send the details through the quote form and you will get a call back.`,
	handoff: true
};

/**
 * Picks the best entry for a question by counting keyword hits, longest
 * keyword first so "as-built" beats a stray "built".
 */
export function answerQuestion(question: string): Answer {
	const text = question.toLowerCase();
	let best: Entry | null = null;
	let bestScore = 0;

	for (const entry of entries) {
		let score = 0;
		for (const keyword of entry.keywords) {
			if (text.includes(keyword)) score += keyword.length;
		}
		if (score > bestScore) {
			bestScore = score;
			best = entry;
		}
	}

	if (!best) return FALLBACK;
	return { text: best.answer, handoff: best.handoff ?? false };
}
