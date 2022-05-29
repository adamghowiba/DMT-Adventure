<script lang="ts">
	import ListingNav from '$lib/components/listing/ListingNav.svelte';
	import ListingDetails from '$lib/dashboard/listing/forms/ListingDetails.svelte';
	import ListingBar from '$lib/dashboard/listing/ListingBar.svelte';
import { listingStore } from '$lib/stores/listingNav-store';
	import type { ListingNavContext, ListingNavGroups, ListingNavSection } from '$lib/types/link-context';
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let navSections: Writable<ListingNavSection[]> = writable([]);
	let activeSection: ListingNavGroups = 'details';

	setContext<ListingNavContext>('linkGroups', {
		addLinkGroup: (link: ListingNavSection) => {
			$navSections = [...$navSections, link];
		},
		navSections
	});

	interface ListingNavGroup {
		name: string;
		href: string;
		links: ListingNavLink[];
	}

	interface ListingNavLink {
		name: string;
		element: HTMLElement | null;
	}

	interface ListingNav {
		details: ListingNavGroup;
		security: ListingNavGroup;
	}

	$: console.log($listingStore);
</script>

<main>
	<ListingBar navSections={$listingStore} bind:activeSection />

	<div class="details">
		{#if activeSection == 'details'}
			<ListingDetails />
		{/if}

		<!-- <div class="filler" /> -->
		<div class="filler" />
		<div class="filler" />
	</div>
</main>

<style lang="scss">
	.details {
		background-color: var(--color-white);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}
	.filler {
		height: 50vh;
	}
	main {
		position: relative;
		display: grid;
		gap: var(--space-lg);
		grid-template-columns: auto 1fr;
	}
</style>
