<script lang="ts" context="module">
	import { PLACES } from '$lib/constants/places';
	import BottomBar from '$lib/dashboard/listing/BottomBar.svelte';
	import BedsAndOccupancy from '$lib/dashboard/listing/rooms/BedsAndOccupancy.svelte';
	import CoverPhoto from '$lib/dashboard/listing/rooms/CoverPhoto.svelte';
	import RoomInfo from '$lib/dashboard/listing/rooms/RoomInfo.svelte';
	import RoomPrice from '$lib/dashboard/listing/rooms/RoomPrice.svelte';
	import type { Place, Room } from '$lib/types/listing';
	import type { DeepPartial } from '$lib/types/type-helpers';
	import { roomSchema } from '$lib/validations/room-validation';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ params }) => {
		const listingId = parseInt(params.id);
		const listingData = PLACES.find((listing) => listing.id === listingId);

		if (!listingData || isNaN(listingId))
			return {
				error: new Error(`Listing not found`),
				status: 400
			};

		return {
			props: {
				listingData
			}
		};
	};
</script>

<script lang="ts">
	export let listingData: Place;

	let canSubmit: boolean = false;
	let formElement: HTMLFormElement;
	let formError: string;

	let roomInfo: Partial<Pick<Room, 'roomType' | 'stock' | 'name'>> = {
		stock: undefined,
		roomType: undefined,
		name: undefined
	};

	interface RoomData {
		info: Partial<Pick<Room, 'roomType' | 'stock' | 'name'>>;
		bed: Partial<Pick<Room, 'beds'>>;
		price: Partial<Pick<Room, 'price'>>;
	}

	let formData: RoomData = {
		info: {
			name: undefined,
			stock: undefined,
			roomType: undefined
		},
		bed: {
			beds: []
		},
		price: {
			price: undefined
		}
	};

	const roomData: Partial<Room> = {
		id: 1239541,
		...roomInfo
	};

	$: newRoomData = { ...formData.info, ...formData.bed, ...formData.price };

	const checkBedValidity = () => Boolean(roomData.beds?.length);

	const checkPricingValidity = () => Boolean(roomData.price && roomData.price > 0);

	const checkInputValidity = () => {
		const inputs = formElement.querySelectorAll('input');
		const inputValid: boolean[] = [];

		inputs.forEach((input) => {
			inputValid.push(input.checkValidity());
		});

		return inputValid.every((input) => Boolean(input));
	};

	const handleFormSubmit = () => {};

	const handleBackButton = () => {
		window.history.back();
	};

	const validate = async (data: Partial<Room>) => {
		console.log('Validating', data);
		try {
			const result = roomSchema.validateSync(data);

			console.log(result);
		} catch (error) {
			const [mainError] = error.errors;
			formError = mainError;

			console.log(mainError);
		}
	};

	const handleSave = () => {
		validate(newRoomData);
	};

	// $: console.log(newRoomData);

	// $: if (roomData && formElement) canSubmit = checkBedValidity() && checkInputValidity() && checkPricingValidity();
</script>

<h3>Create A New Room Type</h3>
<form
	on:submit|preventDefault={handleFormSubmit}
	class="edit section--sm"
	on:change={checkInputValidity}
	on:input={checkInputValidity}
	bind:this={formElement}
>
	<span>{formError}</span>
	<CoverPhoto uploadedImageSrc={roomData['images']} />
	<RoomInfo bind:roomInfo={formData.info} />
	<BedsAndOccupancy bind:beds={formData.bed.beds} />
	<RoomPrice bind:roomPrice={formData.price.price} />

	<BottomBar
		saveActionName="Create"
		on:back={handleBackButton}
		on:save={handleSave}
		disabled={false}
	/>
</form>

<style lang="scss">
	.edit {
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
	}
</style>
