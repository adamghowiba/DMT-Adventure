import type { Writable } from 'svelte/store';

export interface Link {
	name: string;
	element?: HTMLElement;
}

export interface LinkContext {
	setLink: (link: Link) => void;
	linkStore: Writable<Link[]>;
}

export interface ListingNavSection {
	name: string;
	href: string;
	groups: ListingNavGroup[];
}

export interface ListingNavGroup {
	name: string;
	href: string;
	links: ListingNavLink[];
}

export interface ListingNavLink {
	name: string;
	element: HTMLElement | null;
}

export type ListingNavGroups = 'details' | 'pricing' | 'policies';

export type ListingNav = {
	[K in ListingNavGroups]: ListingNavGroup;
};

/* Context */
export interface ListingNavContext {
	addLinkGroup: (item: ListingNavSection) => void;
	navSections: Writable<ListingNavSection[]>;
}
