<script lang="ts" context="module">
	export const load: Load = ({ params }) => {
		const listingId = parseInt(params.id);
		const listingData = listingApi.getListingById(listingId);

		if (isNaN(listingId) || !listingData) return { error: Error('Listing not found'), status: 400 };

		return {
			props: {
				listingId,
				listingData
			}
		};
	};
</script>

<script lang="ts">
	import listingApi from '$lib/api/listing-api';
	import DetailAddress from '$lib/dashboard/listing/forms/detail/DetailAddress.svelte';
	import DetailAmentites from '$lib/dashboard/listing/forms/detail/DetailAmentites.svelte';
	import DetailDescription from '$lib/dashboard/listing/forms/detail/DetailDescription.svelte';
	import DetailTitle from '$lib/dashboard/listing/forms/detail/DetailTitle.svelte';
	import FormWrapper from '$lib/dashboard/listing/FormWrapper.svelte';
	import ListingEditContainer from '$lib/dashboard/listing/ListingEditContainer.svelte';
	import ListingWrap from '$lib/dashboard/listing/ListingWrap.svelte';
	import type { Place } from '$lib/types/listing';
	import type { Load } from '@sveltejs/kit';

	export let listingData: Place;
</script>

<ListingEditContainer title="details">
	<ListingWrap title="Listing Basics">
		<DetailTitle value={listingData.title} />
		<DetailDescription inputs={{ description: listingData.desc }} />
	</ListingWrap>

	<ListingWrap title="Location">
		<DetailAddress address={listingData.address} />
	</ListingWrap>

	<ListingWrap title="Room Packages" gap={false}>
		<FormWrapper href="rooms">
			<div class="rooms" slot="value">
				{#each listingData.rooms as room}
					<span>{room.name} - ${room.price}</span>
				{/each}
			</div>
		</FormWrapper>
	</ListingWrap>

	<ListingWrap title="Amentities" gap={false}>
		<DetailAmentites />
	</ListingWrap>
</ListingEditContainer>

<style lang="scss">
	.filler {
		height: 50vh;
	}
	.rooms {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);

		span {
			color: var(--color-gray-muted);
		}
	}
</style>
