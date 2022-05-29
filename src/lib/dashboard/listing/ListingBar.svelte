<script lang="ts">
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import { listingStore } from '$lib/stores/listingNav-store';
	import type { ListingNav, ListingNavGroup, ListingNavGroups } from '$lib/types/link-context';

	export let activeSection: ListingNavGroups;

	const getNavSectionEntires = (section: ListingNav) => {
		return Object.entries(section) as [ListingNavGroups, ListingNavGroup][];
	};

	const scrollToElement = (element: HTMLElement | null, OFFSET = 10) => {
		if (!element) return;

		window.scrollTo({ top: element.offsetTop + OFFSET, behavior: 'smooth' });
	};

	/* ! Caution: This assume the laast URL pathanme is the location EX. /dashboard/listing/{details} */
	const getActiveSection = () => {
		const URLPaths = $page.url.pathname.split('/');
		const lastPath = URLPaths[URLPaths.length - 1];

		return lastPath;
	};
</script>

<div class="bar-wrap">
	<div class="bar">
		{#each getNavSectionEntires($listingStore) as [key, value]}
			<a
				href="/dashboard/listing/213123{value.href}"
				class="bar__group"
				on:click={() => (activeSection = key)}
			>
				{value.name}
			</a>
			{#if getActiveSection() === key}
				<div class="bar__links">
					{#each value.links as link}
						<span on:click={() => scrollToElement(link.element)}>{link.name}</span>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.bar-wrap {
		width: auto;
		padding: var(--space-xs);
		padding-left: 0;
	}
	.bar {
		position: sticky;
		height: max-content;
		display: flex;
		flex-direction: column;
		top: calc(83px + var(--space-md));
		gap: var(--space-xs);

		&__group {
			font-size: var(--text-h4);
			text-transform: capitalize;
		}

		&__links {
			display: flex;
			flex-direction: column;
			gap: var(--space-xs);
			padding-left: var(--space-xs);
		}
	}
</style>
