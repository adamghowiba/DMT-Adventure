import type { LatLng, LatLngExpression } from 'leaflet';

export type ListingStatus = 'unlisted' | 'listed' | 'deactivate';
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
	review?: Review[];
	listingStatus?: ListingStatus;
	address?: Address;
	coords: LatLngExpression;
}

export interface Address {
	street: string;
	city: string;
	state: string;
	zip: string;
}

export interface Review {
	thumbnail: string;
	name: string;
	date: Date;
	content: string;
	rating: number;
}

export interface Place extends Listing {
	rooms: Room[];
}

/* ROOM TYPES */
export type RoomType = 'suite' | 'penthouse' | 'single' | 'double' | 'triple';
export type BedType = 'twin' | 'full' | 'queen' | 'king';

export interface Room {
	id: number;
	name: string;
	beds: Beds[];
	price: number;
	quantity: number;
	images?: string;
	roomType?: RoomType;
	stock: number;
}

export interface Beds {
	type: BedType;
	count: number;
}

export interface Expierence extends Listing {
	time: string;
}
