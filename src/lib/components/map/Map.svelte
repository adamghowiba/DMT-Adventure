<script lang="ts">
	import { onMount } from 'svelte';
	import type { LatLngExpression, Map, Marker, LeafletEventHandlerFn } from 'leaflet';
	import type Leaflet from 'leaflet';

	const mapbox_token =
		'pk.eyJ1Ijoid2VicmV2aXZlZCIsImEiOiJjbDNuNDd6MG0wOXdtM3JzOWZjdDFzdWVuIn0.0RW0ALlkUzoBG1T2S1Eg9w';
	let leaflet: typeof Leaflet;
	let mapElement: HTMLElement;

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
				maxZoom: 18
			})
			.addTo(map);
	}

	const cords: LatLngExpression[] = [
		[27.717245, 85.323959],
		[27.742245, 85.343959],
		[27.797245, 85.253959]
	];

	const NAPAL_CORDS: { [key: string]: LatLngExpression } = {
		kathmandu: [27.717245, 85.323959]
	};

	const addTilesLayers = (cords: LatLngExpression[], map: Map) => {
		let markers: Marker[] = [];
		// const popup = leaflet.popup().setLatLng(cords[0]).setContent('Hello world').openOn(map);

		const onMarkerClick: LeafletEventHandlerFn = (event) => {
			console.log('Clicked marker', event.target);
			const { lat, lng } = event.target._latlng;

			// popup
			// 	.setContent('Okay sir got it')
			// 	.setLatLng([lat + 0.005, lng])
			// 	.openOn(map);
		};

		cords.forEach((cord) => {
			const marker = leaflet.marker(cord, { title: 'Hello world', riseOnHover: true });

			marker.addEventListener('click', onMarkerClick, 'name');
			marker.addTo(map);

			markers.push(marker);
		});

		return () => {
			markers.forEach((marker) => {
				marker.removeEventListener('click', onMarkerClick);
			});
		};
	};

	onMount(async () => {
		const L = await import('leaflet');
		const map = new L.Map('map').setView([27.717245, 85.323959], 12);
		leaflet = L;

		let container = leaflet.DomUtil.get('map');
		if (container) {
			//@ts-ignore
			container._leaflet_id = null;
		}

		addFooterAttributionToMap(map);
		const destory = addTilesLayers(cords, map);

		return () => destory();
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
	#map {
		width: 100%;
		height: 100%;
	}
</style>
