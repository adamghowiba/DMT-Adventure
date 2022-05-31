export interface Listing {
	id: number;
	title: string;
	subtitle: string;
	desc: string;
	rating: number;
	ratingTotal: number;
	total: number;
	subtotal: number;
	imgSrc: string;
	availableCount?: number;
	review?: Review[]
	listingStatus?: ListingStatus;
	address?: Address;
}

export interface Address {
	street: string;
	city: string;
	state: string;
	zip: string;
}

export type ListingStatus = 'unlisted' | 'listed' | 'deactivate';

export type BedType = 'king' | 'queen' | 'twin';

export interface Beds {
	type: BedType;
	count: number;
}

export interface Room {
	id: number;
	name: string;
	beds: Beds[];
	price: number;
	quantity: number;
	images?: string[];
}

export interface Place extends Listing {
	rooms: Room[];
}

export interface Expierence extends Listing {
	time: string;
}

export interface Review {
	thumbnail: string;
	name: string;
	date: Date;
	content: string;
	rating: number;
}
