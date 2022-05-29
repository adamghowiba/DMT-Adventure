<script context="module" lang="ts">
	import ListingDescription from '$lib/components/listing/ListingDescription.svelte';
	import ListingDetail from '$lib/components/listing/ListingDetail.svelte';
	import ListingGallery from '$lib/components/listing/ListingGallery.svelte';
	import ListingHeader from '$lib/components/listing/ListingHeader.svelte';
	import ListingHighlight from '$lib/components/listing/ListingHighlight.svelte';
	import ListingNav from '$lib/components/listing/ListingNav.svelte';
	import ListingWrapper from '$lib/components/listing/ListingWrapper.svelte';
	import RoomSection from '$lib/components/listing/place/RoomSection.svelte';
	import Rail from '$lib/components/listing/rail/Rail.svelte';
	import RailItem from '$lib/components/listing/rail/RailItem.svelte';
	import ReviewSection from '$lib/components/listing/ReviewSection.svelte';
	import { PLACES } from '$lib/constants/places';
	import type { Link, LinkContext } from '$lib/types/link-context';
	import type { Place, Room } from '$lib/types/listing';
	import type { Load } from '@sveltejs/kit';
	import { onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export const load: Load = ({ params }) => {
		const placeId = params.id;
		const parsedPlaceId = decodeURIComponent(placeId);
		const placeData = PLACES.find((place) => place.title === parsedPlaceId);

		if (!placeData)
			return {
				error: new Error('Place no longer exsits.'),
				status: 400
			};

		return {
			props: {
				placeId,
				placeData,
				parsedPlaceId
			}
		};
	};
</script>

<script lang="ts">
	export let placeId: string;
	export let parsedPlaceId: string;
	export let placeData: Place;

	let linkStore: Writable<Link[]> = writable([]);

	let isNavOpen = false;
	let isReserveOpen = false;
	let galleryWrapperElement: HTMLElement;

	/* TODO: Implement from  */
	let bookingDays = 3;
	// let total: number;

	let selectedRooms: Room[] = [];

	setContext<LinkContext>('links', {
		setLink: (link: Link) => {
			$linkStore = [...$linkStore, link];
		},
		linkStore
	});

	const handleScrollPastGallery: IntersectionObserverCallback = (entries, observer) => {
		if (!entries[0].isIntersecting) {
			isNavOpen = true;
			return;
		}
		isNavOpen = false;
	};

	const handleBookIntersection = ({ detail: inView }: { detail: boolean }) => {
		if (inView) {
			isReserveOpen = false;
			return;
		}
		isReserveOpen = true;
	};

	const handleReserveAction = ({ detail: room }: { detail: Room }) => {
		const isRoomSelected = selectedRooms.find((selectedRoom) => room.id === selectedRoom.id);

		if (isRoomSelected) {
			selectedRooms = selectedRooms.filter((selectedRoom) => selectedRoom.id !== room.id);
			return;
		}

		selectedRooms = [...selectedRooms, room];
	};

	const getBookingTotal = (rooms: Room[]) => {
		return rooms.reduce((acc, room) => (acc += room.price), 0);
	};

	const constructBookingUrlParams = (listingId: string, rooms: Room[]) => {
		const urlParams = new URLSearchParams();
		rooms.forEach((room) => {
			urlParams.append('room', room.id.toString());
		});
		urlParams.set('checkin', '5-26-2022');
		urlParams.set('checkout', '5-28-2022');
		urlParams.set('guests', '1')

		return `/book/${placeData.id}?${urlParams.toString()}`;
	};

	onMount(() => {
		const observer = new IntersectionObserver(handleScrollPastGallery, {});
		observer.observe(galleryWrapperElement);

		return () => {
			observer.disconnect();
			observer.unobserve(galleryWrapperElement);
		};
	});

	$: bookingTotal = getBookingTotal(selectedRooms);
</script>

<ListingHeader title={parsedPlaceId} location="Marco Island Movenpick Naples, Italy" />

{#if isNavOpen}
	<ListingNav linkStore={$linkStore} isReserveVisible={isReserveOpen} bookingUrl={constructBookingUrlParams(placeId, selectedRooms)} />
{/if}

<div class="gallery-wrap" bind:this={galleryWrapperElement}>
	<ListingGallery
		images={[
			'/images/global/cappella.png',
			'/images/global/castel_ovo.png',
			'/images/global/galleria_umberto.png',
			'/images/global/ocean_footer.png',
			'/images/index/cave_explore.png'
		]}
	/>
</div>

<div class="grid container">
	<div class="grid__body">
		<ListingWrapper gap="var(--space-md)" hr={false}>
			<ListingHighlight
				title="Great location"
				desc="100% of recent guests gave the location a 5-star rating."
				icon="cil:location-pin"
			/>
			<ListingHighlight
				title="Great location"
				desc="100% of recent guests gave the location a 5-star rating."
				icon="fluent:key-32-regular"
				iconRotate={3}
			/>
		</ListingWrapper>

		<ListingWrapper title="Hotel Description" navTitle="description">
			<ListingDescription>
				This property is 1 minute walk from the beach. Situated in Naples, 400 m from Castel
				dell'Ovo, Di Palma Suite provides rooms with air conditioning and free WiFi. The property is
				set 1 km from Molo Beverello, 1 km from Maschio Angioino and 600 m from San Carlo Theatre.
				The property is located in the Lungomare Caracciolo district.
			</ListingDescription>
		</ListingWrapper>

		<ListingWrapper title="Choose your room" navTitle="rooms">
			<RoomSection rooms={placeData.rooms} on:reserveSelected={handleReserveAction} />
		</ListingWrapper>
	</div>

	<Rail
		total={bookingTotal}
		{bookingDays}
		bookingUrl={constructBookingUrlParams(placeId, selectedRooms)}
		on:bookIntersection={handleBookIntersection}
	>
		{#each selectedRooms as room}
			<RailItem
				title={room.name}
				description="${room.price} x {bookingDays}"
				price={room.price * bookingDays}
			/>
		{/each}
	</Rail>
</div>

<div class="container">
	<ListingWrapper title="Good to know" navTitle="info">
		<ListingDetail title="Childern">Childern are welcome at this hotel.</ListingDetail>
		<ListingDetail title="Pets">Pets are not allowed.</ListingDetail>
		<ListingDetail title="Breakfest">Free contentital breakfest included.</ListingDetail>
		<ListingDetail title="Accepts payment methods">
			The hotel accepts the following payments (Visa, Mastercard, Amex).
		</ListingDetail>
		<ListingDetail title="Import information fromthe hotel" border={false}>
			Guests are required to show a photo ID and credit card upon check-in. Please note that all
			Special Requests are subject to availability and additional charges may apply. In response to
			the coronavirus (COVID-19), additional safety and sanitation measures are in effect at this
			property. Food and beverage services at this property may be limited or unavailable due to the
			coronavirus (COVID-19). Due to the coronavirus (COVID-19), this property is taking steps to
			protect the safety of guests and staff. Certain services and amenities may be reduced or
			unavailable as a result. Due to the coronavirus (COVID-19), this property has reduced
			reception and service hours.
		</ListingDetail>
	</ListingWrapper>

	<ReviewSection reviews={placeData.review} />
</div>

<div class="footer" />

<style lang="scss">
	.footer {
		height: 100vh;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr auto;
		padding-bottom: var(--space-xl);
		padding-top: var(--space-xl);
		gap: var(--space-2xl);

		&__body {
			display: flex;
			flex-direction: column;
			gap: var(--space-md);
		}
	}
</style>
