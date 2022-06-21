<script context="module" lang="ts">
	export const prerender = false;
	export const load: Load = ({ url }) => {
		let checkIn = new Date(url.searchParams.get('checkIn') || '');
		let checkOut = new Date(url.searchParams.get('checkOut') || '');
		const location = url.searchParams.get('location');

		if (!location)
			return {
				error: new Error('Must specify a location'),
				status: 400
			};

		if (isNaN(checkIn.getDate())) checkIn = new Date();
		if (isNaN(checkOut.getDate())) {
			checkOut = new Date();
			checkOut.setDate(checkOut.getDate() + 7);
		}

		return {
			props: {
				checkIn,
				checkOut,
				location
			}
		};
	};
</script>

<script lang="ts">
	import Map from '$lib/components/map/Map.svelte';
	import SearchNavbar from '$lib/components/navbar/SearchNavbar.svelte';
	import SearchCard from '$lib/components/search/SearchCard.svelte';
	import { PLACES } from '$lib/constants/places';
	import type { Place } from '$lib/types/listing';
	import type { Load } from '@sveltejs/kit';
	import type { Popup } from 'leaflet';

	export let location: string;
	export let checkIn: Date;
	export let checkOut: Date;

	type PlaceWithPopup = Place & { popup: Popup };
	let places = PLACES as PlaceWithPopup[];

	const handleMouseEnter = (index: number) => {
		places[index].popup.setContent(`<div class="marker hovered"> $${places[index].total} </div>`);
	};

	const handleMouseLeave = (index: number) => {
		places[index].popup.setContent(`<div class="marker"> $${places[index].total} </div>`);
	};
</script>

<section class="wrapper">
	<SearchNavbar {location} {checkIn} {checkOut} />

	<section class="grid">
		<div class="cards">
			{#if places.length > 0}
				<header>
					<div class="mobile-thumb" />
					<h5 style:text-transform="capitalize">{places.length} stays in {location}, Nepal</h5>
					<hr />
				</header>

				<div class="cards__items">
					{#each places as card, i}
						<SearchCard
							{...card}
							on:mouseenter={() => handleMouseEnter(i)}
							on:mouseleave={() => handleMouseLeave(i)}
						/>
					{/each}
				</div>
			{:else}
				<div class="no-result">
					<h3>No results</h3>
					<p>Try changing or removing some of your filters or adjusting your search area.</p>
					<hr />
				</div>
			{/if}
		</div>

		<div class="map">
			<Map bind:places />
		</div>
	</section>
</section>

<style lang="scss">
	.wrapper {
		height: 100%;
	}
	.no-result {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		margin-top: var(--space-sm);

		h3 {
			line-height: 1em;
		}

		p {
			margin-bottom: var(--space-2xs);
		}
	}
	hr {
		border: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--color-trans);
	}
	.grid {
		display: flex;
		grid-template-columns: 1fr 1fr;
		height: calc(100vh - 164px);
		overflow: hidden;
	}
	.map {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.mobile-thumb {
		display: none;
	}
	.cards {
		position: relative;
		z-index: 100;
		width: 100%;
		max-width: 750px;
		background-color: var(--color-white);
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: var(--space-sm);

		&__items {
			display: flex;
			flex-direction: column;
			gap: var(--space-lg);
		}

		header {
			display: flex;
			flex-direction: column;
			gap: var(--space-sm);
			margin-bottom: -8px;
		}
	}
	hr {
		margin: 0;
		padding: 0;
		border: none;
		border-top: 1px solid var(--color-trans);
	}

	@media screen and (max-width: 768px) {
		.grid {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
			overflow: unset;
		}
		.cards {
			position: absolute;
			width: 100%;
			bottom: 0;
			min-height: 50vh;
			transform: translateY(70%);
			overflow-y: unset;
			border-top-left-radius: 30px;
			border-top-right-radius: 30px;
			border: 1px solid var(--color-trans);

			&__items {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
			}
		}
		.mobile-thumb {
			display: block;
			width: 40px;
			height: 5px;
			border-radius: 40px;
			background-color: rgba(0, 0, 0, 0.219);
			margin: 0 auto;
			margin-top: -10px;
		}
		.no-result {
			align-items: center;
		}
		header {
			text-align: center;

			hr {
				display: none;
			}
		}
		.map {
			position: fixed;
			top: 0;
			z-index: 1;
			height: 100%;
		}
	}

	@media screen and (max-width: 550px) {
		.cards {
			bottom: 0;
			transform: translateY(90%);
			min-height: 100vh;
			background-color: white;
			height: max-content;

			&__items {
				display: grid;
				grid-template-columns: 1fr;
			}
		}
	}
</style>
