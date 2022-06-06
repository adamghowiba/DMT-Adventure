<script lang="ts" context="module">
	import { PLACES } from '$lib/constants/places';
	import BottomBar from '$lib/dashboard/listing/BottomBar.svelte';
	import BedsAndOccupancy from '$lib/dashboard/listing/rooms/BedsAndOccupancy.svelte';
	import CoverPhoto from '$lib/dashboard/listing/rooms/CoverPhoto.svelte';
	import RoomInfo from '$lib/dashboard/listing/rooms/RoomInfo.svelte';
	import RoomPrice from '$lib/dashboard/listing/rooms/RoomPrice.svelte';
	import type { Room } from '$lib/types/listing';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ params }) => {
		const listingId = parseInt(params.id);
		const roomId = parseInt(params.roomId);
		const listingData = PLACES.find((listing) => listing.id === listingId);

		if (!listingData || isNaN(listingId) || isNaN(roomId))
			return {
				error: new Error(`Listing not found`),
				status: 400
			};

		const roomData = listingData.rooms.find((room) => room.id === roomId);

		if (!roomData)
			return {
				error: new Error(`Room not found in listing id ${params.id}`),
				status: 400
			};

		return {
			props: {
				listingData,
				roomData
			}
		};
	};
</script>

<script lang="ts">
	
	// Commented Out: Unsued
	// export let listingData: Place;
	export let roomData: Room;

	const handleBackButton = () => {
		window.history.back();
	};
</script>

<h3>{roomData.name}</h3>

<section class="edit section--sm">
	<CoverPhoto uploadedImageSrc={roomData.images} />
	<RoomInfo roomInfo={roomData} />
	<BedsAndOccupancy beds={roomData.beds} />
	<RoomPrice roomPrice={roomData.price} />

	<BottomBar on:back={handleBackButton} on:save />
</section>

<style lang="scss">
	.edit {
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
	}
</style>
