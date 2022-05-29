import { writable } from 'svelte/store';
import type { ListingNav } from '../types/link-context';

/* link must be the same as the key. */
const NAV_ITEMS: ListingNav = {
	details: {
		name: 'Listing Details',
		href: '/details',
		links: []
	},
	pricing: {
		name: 'Pricing',
		href: '/pricing',
		links: []
	},
	policies: {
		name: 'Policies',
		href: '/policies',
		links: []
	}
};

export const listingStore = writable<ListingNav>(NAV_ITEMS);
