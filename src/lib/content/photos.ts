import officePlaza from '$lib/assets/images/dem20office20plaza-2.jpg';
import entrance from '$lib/assets/images/dem20entrance.jpg';
import reception from '$lib/assets/images/reception.jpg';
import cadRoom1 from '$lib/assets/images/cad20room201.jpg';
import cadRoom2 from '$lib/assets/images/cad20room202.jpg';
import conferenceRoom from '$lib/assets/images/conference20room.jpg';
import vehicles from '$lib/assets/images/new20vehicle20pics.jpg';
import atv from '$lib/assets/images/dempic4.jpg';
import boat from '$lib/assets/images/dem-boat1.jpg';
import metalDetector from '$lib/assets/images/dempic5.jpg';
import totalStation from '$lib/assets/images/dempic6.jpg';
import prism from '$lib/assets/images/dempic7.jpg';
import stakeOut from '$lib/assets/images/dempic8.jpg';
import gpsSystem from '$lib/assets/images/gps3a.jpg';
import proxh from '$lib/assets/images/Steve20Pro-xh.jpg';
import backpack from '$lib/assets/images/Tim20Pro-xh20backpack.jpg';
import staff from '$lib/assets/images/staff2.jpg';

export type Photo = {
	src: string;
	/** Short label on the tile — readable at a glance, on any screen. */
	title: string;
	/** The firm's own caption. Revealed on hover, and always shown in the lightbox. */
	caption: string;
	/** What the photo shows, for screen readers and when the image fails. */
	alt: string;
	width: number;
	height: number;
};

/**
 * Captions are transcribed verbatim from demsurveying.com/about.html — they are
 * the firm's own words about its office and equipment. Two plain typos in the
 * source ("stop bye", "coverage's") are corrected; nothing else is reworded.
 */

export const officePhotos: Photo[] = [
	{
		src: officePlaza,
		title: 'Office building',
		alt: 'The DEM Surveying office building and its parking plaza',
		caption:
			'Opened in June 2006, our new professional office building provides ample free parking to clients. We are conveniently located on the edge of Historic Brookville and just south of Interstate 80, Exit 81.',
		width: 450,
		height: 231
	},
	{
		src: entrance,
		title: 'Entrance',
		alt: 'The landscaped entrance to the office, with a faux brick sidewalk',
		caption:
			'From the creative landscaping to the faux brick sidewalk, our office blends well with the surroundings and charming atmosphere of the Brookville community.',
		width: 450,
		height: 268
	},
	{
		src: reception,
		title: 'Reception',
		alt: 'The reception area inside the office',
		caption: 'Clients and guests are greeted at the reception area.',
		width: 449,
		height: 309
	},
	{
		src: cadRoom1,
		title: 'CAD room',
		alt: 'The open-plan CAD room under a cathedral ceiling, with a mounted bull elk',
		caption:
			'Our CAD room is a large open area with a cathedral ceiling to accommodate several drafters (and a large bull elk!). With conventional drafting tables and modern computer workstations, projects may be completed efficiently while in a convenient and pleasant environment for our employees.',
		width: 450,
		height: 267
	},
	{
		src: cadRoom2,
		title: 'CAD room, second view',
		alt: 'A second view of the CAD room, showing drafting tables and workstations',
		caption:
			'Conventional drafting tables sit alongside modern computer workstations, so a project can move from field data to plotted map without leaving the room.',
		width: 399,
		height: 237
	},
	{
		src: conferenceRoom,
		title: 'Conference room',
		alt: 'The conference room, sized for spreading out large maps',
		caption:
			'The conference room is a great place to review new projects, unroll large maps, and hold larger meetings. A small, professionally decorated office is also available for private meetings with clients.',
		width: 399,
		height: 246
	}
];

/** Field kit, grouped the way a job runs: reach the parcel, measure it, draw it. */
export const accessPhotos: Photo[] = [
	{
		src: vehicles,
		title: '4WD fleet',
		alt: "Several of the firm's four-wheel-drive survey vehicles",
		caption:
			'A fleet of four wheel drive vehicles, each equipped with automotive GPS and stocked with necessary field equipment and supplies are available.',
		width: 450,
		height: 300
	},
	{
		src: atv,
		title: 'ATV and trailer',
		alt: 'An ATV loaded on its trailer for remote field access',
		caption:
			'An ATV and trailer can also be used for remote field projects, making our work more efficient.',
		width: 450,
		height: 219
	},
	{
		src: boat,
		title: 'Boat and trailer',
		alt: 'A small survey boat on its trailer',
		caption:
			'We have a small boat and trailer available for hydrographic projects or sites only accessible by water.',
		width: 449,
		height: 298
	},
	{
		src: metalDetector,
		title: 'Metal detector',
		alt: 'A surveyor sweeping the ground with a metal detector',
		caption: 'A quality metal detector is invaluable in locating buried markers.',
		width: 281,
		height: 325
	}
];

export const measurementPhotos: Photo[] = [
	{
		src: totalStation,
		title: 'Total station',
		alt: 'An electronic total station set up on its tripod',
		caption:
			'Points are located using an electronic Total Station and field data is stored on a data collector or in a field book. In the office, this data is downloaded directly to a computer for calculations and CAD plotting.',
		width: 271,
		height: 351
	},
	{
		src: prism,
		title: 'Prism assembly',
		alt: 'A prism assembly mounted on top of a prism pole',
		caption:
			'A prism assembly attached to the top of a prism pole enables measurements from the Total Station to nearly all points located during a typical survey traverse.',
		width: 208,
		height: 337
	},
	{
		src: gpsSystem,
		title: '3-receiver GPS system',
		alt: 'A GPS survey receiver mounted on a tripod in the field',
		caption:
			'Our 3-receiver GPS Survey system offers high productivity with 0.5 cm accuracy (static). This powerful stand-alone system can be used along with conventional survey instruments to provide additional capabilities.',
		width: 449,
		height: 313
	},
	{
		src: stakeOut,
		title: 'Construction stake-out',
		alt: 'A survey crew setting points in building footers on a construction site',
		caption:
			'Our crew has experience on construction stake-out projects of all sizes, including multi-million dollar developments. Here, key points are located in the building footers for a mason who is rapidly approaching.',
		width: 324,
		height: 236
	}
];

export const dataPhotos: Photo[] = [
	{
		src: proxh,
		title: 'GPS Pathfinder ProXH',
		alt: 'A surveyor holding a GPS Pathfinder ProXH receiver and field computer',
		caption:
			"Our GPS Pathfinder® ProXH™ receiver delivers subfoot (30 cm) accuracy with Trimble's revolutionary H-Star™ technology, and with a Zephyr™ antenna, accuracy is 8 inch (20 cm). With a Bluetooth® wireless connection we're cable free between the ProXH receiver and field computer. Field data from the Trimble Recon™ handheld is postprocessed back at the office with GPS Pathfinder Office software.",
		width: 450,
		height: 300
	},
	{
		src: backpack,
		title: 'Backpack GPS assembly',
		alt: 'A surveyor wearing a backpack-mounted GPS and GIS data collection assembly',
		caption:
			'For certain mapping or GIS projects, a backpack assembly makes collecting field data easier and more efficient.',
		width: 450,
		height: 300
	}
];

export const staffPhoto: Photo = {
	src: staff,
	title: 'Our staff',
	alt: 'The DEM Surveying staff together outside the office',
	caption: 'Our most important asset is our staff!',
	width: 448,
	height: 272
};

/** Every field photo, in the order the groups are presented. */
export const fieldPhotos: Photo[] = [...accessPhotos, ...measurementPhotos, ...dataPhotos];
