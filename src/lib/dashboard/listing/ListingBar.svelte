<script lang="ts">
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import { listingStore } from '$lib/stores/listingNav-store';
	import type { ListingNav, ListingNavGroup, ListingNavGroups } from '$lib/types/link-context';
	import { onMount } from 'svelte';

	export let activeSection: ListingNavGroups;

	let barLinksElement: HTMLElement;
	let innerTrackerElement: HTMLElement;
	let interectingGroup: string;
	let observer: IntersectionObserver;

	const getNavSectionEntires = (section: ListingNav) => {
		return Object.entries(section) as [ListingNavGroups, ListingNavGroup][];
	};

	const scrollToElement = (element: HTMLElement | null, OFFSET = -70) => {
		if (!element) return;

		window.scrollTo({ top: element.offsetTop + OFFSET, behavior: 'smooth' });
	};

	/* ! Caution: This assume the laast URL pathanme is the location EX. /dashboard/listing/{details} */
	const getActiveSection = () => {
		const URLPaths = $page.url.pathname.split('/');
		const lastPath = URLPaths[URLPaths.length - 1];

		return lastPath;
	};

	const handleIntersection: IntersectionObserverCallback = (entries, observer) => {
		entries.forEach((entry) => {
			const target = entry.target as HTMLElement;
			const heading = target.querySelector('h4');
			const linkElements = barLinksElement.querySelectorAll('span');

			if (entry.boundingClientRect.top) {
				if (!heading?.innerText) return;

				linkElements.forEach((link) => {
					if (heading.innerText.toLowerCase() === link.id.toLowerCase()) {
						innerTrackerElement.style.transform = `translateY(${link.offsetTop}px)`;
						return;
					}
				});
			}
		});
	};

	$: if (browser && $listingStore[getActiveSection()].links) {
		observer = new IntersectionObserver(handleIntersection, {
			threshold: 0,
			rootMargin: '-30% 0% -70% 0%'
		});
		// @ts-ignore
		$listingStore[getActiveSection()].links.forEach((link) => {
			if (!link.element) return;
			observer.observe(link.element);
		});
	}

	onMount(() => {
		return () => {
			observer.disconnect();
		};
	});
</script>

<div class="bar-wrap">
	<div class="bar">
		{#each getNavSectionEntires($listingStore) as [key, value]}
			<a
				href={value.href.replace('/', '')}
				class="bar__group"
				on:click={() => (activeSection = key)}
			>
				{value.name}
			</a>
			{#if getActiveSection() === key}
				<div class="bar__links" bind:this={barLinksElement}>
					<div class="tracker"><div class="tracker__inner" bind:this={innerTrackerElement} /></div>
					{#each value.links as link}
						<span
							class:highlighted={link.name === interectingGroup}
							id={link.name}
							on:click={() => scrollToElement(link.element)}>{link.name}</span
						>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.tracker {
		height: 100%;
		width: 2px;
		background-color: var(--color-trans);
		position: absolute;
		left: 0;

		&__inner {
			top: 0;
			position: absolute;
			height: 1.2em;
			width: 100%;
			background-color: var(--color-midnight);

			transition: transform 0.15s ease-out;
		}
	}
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
			position: relative;
			display: flex;
			flex-direction: column;
			gap: var(--space-sm);
			padding-left: var(--space-xs);
		}

		.highlighted {
			color: red;
		}
	}
</style>
