<script lang="ts">
	import Map from '$lib/components/map/Map.svelte';
	import SearchCard from '$lib/components/search/SearchCard.svelte';
	import { PLACES } from '$lib/constants/places';
</script>

<section class="grid">
	<div class="cards">
		<header>
			<div class="mobile-thumb" />
			<h5>30+ stays in Marco Island Naples, Italy</h5>
			<hr />
		</header>

		<div class="cards__items">
			{#each PLACES as card}
				<SearchCard {...card} />
			{/each}
		</div>
	</div>

	<div class="map">
		<Map />
	</div>
</section>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		height: calc(100vh - 83px);
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
		z-index: 1000;
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
		}
		.cards {
			position: absolute;
			width: 100%;
			transform: translateY(20%);
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
		header {
			text-align: center;

			hr {
				display: none;
			}
		}
		.map {
			position: fixed;
			height: 100%;
		}
	}

	@media screen and (max-width: 550px) {
		.cards {
			&__items {
				display: grid;
				grid-template-columns: 1fr;
			}
		}
	}
</style>
