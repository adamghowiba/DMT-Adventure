import type { SearchDate } from '$lib/types/Date';
import { writable } from 'svelte/store';

interface Search {
	location?: string;
	startDate?: SearchDate;
	endDate?: SearchDate;
	guest?: number;
}

const DEFAULT_SEARCH: Search = {
	location: undefined,
	startDate: undefined,
	endDate: undefined,
	guest: undefined
};

const createSearchStore = () => {
	const { set, subscribe, update } = writable<Search>(DEFAULT_SEARCH);

	const setStartDate = (date: SearchDate) => {
		update((search) => {
			search.startDate = date;
			return search;
		});
	};

	const setEndDate = (date: SearchDate) => {
		update((search) => {
			search.endDate = date;
			return search;
		});
	};

	return {
		setStartDate,
		setEndDate,
		subscribe,
		set,
		update
	};
};

export const searchStore = createSearchStore();
