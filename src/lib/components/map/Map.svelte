<script lang="ts">
	import type { Place } from '$lib/types/listing';
	import type Leaflet from 'leaflet';
	import type { LatLngExpression, LeafletEventHandlerFn, Map, MapOptions, Popup } from 'leaflet';
	import { onMount } from 'svelte';

	// type MapData = Pick<Place, 'id' | 'title' | 'coords'>;
	type PlaceWithPopup = Place & { popup: Popup };

	// export let coords: LatLngExpression[];
	export let places: PlaceWithPopup[];
	const placeCopy = places;

	const mapbox_token =
		'pk.eyJ1Ijoid2VicmV2aXZlZCIsImEiOiJjbDNuNDd6MG0wOXdtM3JzOWZjdDFzdWVuIn0.0RW0ALlkUzoBG1T2S1Eg9w';
	let leaflet: typeof Leaflet;
	let mapElement: HTMLElement;
	let map: Leaflet.Map;

	async function getCordsFromAddress(address: string): Promise<LatLngExpression> {
		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapbox_token}&limit=1`
		);
		const longlat = await response.json();
		const coord = longlat.features[0];

		return [coord.center[1], coord.center[0]];
	}

	function addFooterAttributionToMap(map: Map) {
		const newUrl = `https://api.mapbox.com/styles/v1/webrevived/cl3n2tb9i001n14qaahvelw5x/tiles/256/{z}/{x}/{y}@2x?access_token=${mapbox_token}`;

		leaflet
			.tileLayer(newUrl, {
				id: 'mapbox://styles/webrevived/cl3n2tb9i001n14qaahvelw5x',
				accessToken: mapbox_token,
				tileSize: 512,
				zoomOffset: -1,
				maxZoom: 15,
				minZoom: 4
			})
			.addTo(map);
	}

	let popup: Popup;

	const addTilesLayers = (places: PlaceWithPopup[], map: Map) => {
		places.forEach((place, i) => {
			let popup = leaflet
				.popup({ closeOnClick: false, autoClose: false })
				.setLatLng(place.coords)
				.setContent(`<div class="marker"> $${place.total} </div>`)
				.addTo(map);
			places[i]['popup'] = popup;
		});

		// coords.forEach((cord) => {
		// 	const marker = leaflet.marker(cord);

		// 	marker.addTo(map);
		// });
	};

	const handleMapPane: LeafletEventHandlerFn = (event) => {
		const nwBounds = map.getBounds().getNorthEast();
		const swBounds = map.getBounds().getSouthWest();
		const bounds = leaflet.latLngBounds(nwBounds, swBounds);

		const visibleListings = placeCopy.filter((place) => {
			return bounds.contains(place.coords);
		});

		places = visibleListings;
	};

	// const getCordsFormListings = (listings: MapData[]): LatLngExpression[] => {
	// 	return listings.map(({ coords }) => coords);
	// };

	onMount(async () => {
		const MAP_OPTIONS: MapOptions = {
			zoomSnap: 0.25,
			zoomDelta: 4,
			wheelPxPerZoomLevel: 60
		};

		const L = await import('leaflet');
		map = new L.Map('map', MAP_OPTIONS).setView([27.717245, 85.323959], 11);
		leaflet = L;

		let container = leaflet.DomUtil.get('map');
		if (container) {
			//@ts-ignore
			container._leaflet_id = null;
		}

		map.on('moveend', handleMapPane);

		addFooterAttributionToMap(map);
		addTilesLayers(places, map);

		return () => {
			map.off();
			map.remove();
			map.clearAllEventListeners();
			map.zoomControl.remove();
		};
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
		integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
		crossorigin=""
	/>
	<link href="https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.css" rel="stylesheet" />
</svelte:head>

<div id="map" bind:this={mapElement} />

<style lang="scss">
	:global(.leaflet-popup-content-wrapper, .map-legends, .map-tooltip) {
		background-color: transparent;
		box-shadow: none;
		background: transparent;
		border-radius: 3px !important;
	}

	:global(.leaflet-popup-content-wrapper .leaflet-popup-content) {
		background-color: transparent;
	}

	:global(.leaflet-popup-tip-container) {
		display: none;
	}

	@keyframes popup {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.1);
		}
	}

	:global(.marker) {
		position: absolute;
		top: 0;
		padding: var(--space-3xs);
		background-color: white;
		color: var(--color-midnight);
		font-weight: var(--fw-extra-bold);
		display: flex;
		box-shadow: var(--shadow-image);
		max-width: 90px;
		justify-content: center;
		align-items: center;
		left: 0;
		border-radius: 20px;
		width: 100%;
	}

	:global(.marker.hovered) {
		background-color: black;
		color: white;
		animation: popup 0.15s ease-in-out forwards;
	}
	#map {
		width: 100%;
		height: 100%;
	}
</style>
