<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ params, url }) => {
		const urlParams = new URLSearchParams(url.searchParams);
		const selectedRooms = Array.from(urlParams.getAll('room').values());
		const listingId = parseInt(params.id, 10);
		const listingData = PLACES.find((listing) => listingId === listing.id);
		const checkIn = urlParams.get('checkin');
		const checkOut = urlParams.get('checkout');
		const guests = parseInt(urlParams.get('guests') || '');

		if (!listingData)
			return {
				error: new Error('Cannot find listing'),
				status: 400
			};

		if (!checkIn || !checkOut)
			return {
				error: new Error('Must specify a check & checkout date'),
				status: 400
			};

		const checkInDate = new Date(checkIn);
		const checkOutDate = new Date(checkIn);

		if (isNaN(checkInDate.getDate()) || isNaN(checkOutDate.getDate()))
			return {
				error: new Error('Invalid date format. please try again'),
				status: 400
			};

		return {
			props: {
				selectedRooms,
				listingId,
				listingData,
				checkIn,
				checkOut,
				guests: isNaN(guests) ? 1 : guests
			}
		};
	};
</script>

<script lang="ts">
	import BookPolicy from '$lib/components/book/BookPolicy.svelte';
	import BookRail from '$lib/components/book/BookRail.svelte';
	import PaymentCapture from '$lib/components/book/PaymentCapture.svelte';
	import TripDetails from '$lib/components/book/TripDetails.svelte';
	import Button from '$lib/components/global/Button.svelte';
	import RailItem from '$lib/components/listing/rail/RailItem.svelte';
	import { PLACES } from '$lib/constants/places';
	import type { Place } from '$lib/types/listing';

	// Commented out: Unused
	// export let listingId: number;
	
	export let selectedRooms: string[];
	export let checkIn: string;
	export let checkOut: string;
	export let listingData: Place;
	export let guests: number;

	const parsedCheckIn = new Date(checkIn);
	const parsedCheckOut = new Date(checkOut);

	const getSelectedRooms = (rooms: string[]) => {
		if (!rooms?.length) return [];

		return rooms.map((id) => {
			const parsedId = parseInt(id);

			return listingData.rooms.find((room) => room.id === parsedId);
		});
	};
</script>

<div class="wrapper container">
	<h2>Confirm and pay</h2>

	<div class="grid">
		<div class="confirm">
			<TripDetails {guests} checkInDate={parsedCheckIn} checkOutDate={parsedCheckOut} />
			<PaymentCapture />
			<BookPolicy />
			<p class="terms">
				By selecting the button below, I agree to the Host's House Rules, Airbnb's Rebooking and
				Refund Policy, and that Airbnb can charge my payment method if I'm responsible for damage.
			</p>
			<Button size="large">Confirm and pay</Button>
		</div>

		<BookRail title={listingData.title} thumbnail={listingData.imgSrc}>
			{#each getSelectedRooms(selectedRooms) as room}
				{#if room}
					<RailItem title={room.name} price={room.price} />
				{/if}
			{/each}
		</BookRail>
	</div>
</div>

<style lang="scss">
	.wrapper {
		padding-top: var(--space-xl);
		padding-bottom: var(--space-xl);
	}
	.grid {
		display: grid;
		gap: var(--space-lg);
		grid-template-columns: 1.5fr 1fr;
		padding-top: var(--space-md);
		padding-bottom: var(--space-md);
	}

	.confirm {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.terms {
		padding: var(--space-2xs) 0;
		font-size: var(--text-h6);
	}
</style>
