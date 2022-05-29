<script lang="ts">
	import { listingStore } from '$lib/stores/listingNav-store';
	import type {
	ListingNavGroups,
	ListingNavLink
	} from '$lib/types/link-context';
	import { getContext } from 'svelte';

	export let title: string;
	let wrapperElement: HTMLElement;

	const navGroup = getContext<ListingNavGroups>('navGroup');

	const addLink = (group: ListingNavGroups, link: ListingNavLink) => {
		$listingStore[group].links = $listingStore[group].links.filter((link) => link.name !== title);
		$listingStore[group].links = [...$listingStore[group].links, link];
	};

	$: if (navGroup) {
		addLink(navGroup, { name: title, element: wrapperElement });
	}
</script>

<div class="wrapper" bind:this={wrapperElement}>
	<h4>{title}</h4>
	<div class="wrapper__content">
		<slot />
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);

		&__content {
			display: flex;
			flex-direction: column;
			gap: var(--space-md);
		}
	}
</style>
