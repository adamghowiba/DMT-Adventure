<script lang="ts" context="module">
	export let load: Load = ({ params }) => {
		const listingId: number = parseInt(params.id);
		const roomData = PLACES.find((place) => place.id === listingId);

		if (!roomData)
			return {
				error: new Error('Listing does not exsist'),
				status: 400
			};

		return {
			props: {
				roomData: roomData.rooms || []
			}
		};
	};
</script>

<script lang="ts">
	import Button from '$lib/components/global/Button.svelte';
	import { PLACES } from '$lib/constants/places';
	import RoomTypeCard from '$lib/dashboard/listing/rooms/RoomTypeCard.svelte';
	import type { Room } from '$lib/types/listing';
	import Icon from '@iconify/svelte';
	import type { Load } from '@sveltejs/kit';

	export let roomData: Room[];
</script>

<header>
	<h3>Rooms & Packages ({roomData.length})</h3>
	<Button style="border" size="small" icon="fluent:add-square-24-regular" href="rooms/create"
		>Add Room Type</Button
	>
</header>

{#if roomData.length}
	<section class="cards section--sm">
		{#each roomData as room}
			<a class="edit-card" href="rooms/edit-{room.id}">
				<RoomTypeCard {room}>
					<a class="edit-action" href="rooms/edit-{room.id}">
						<Icon icon="akar-icons:edit" color="var(--color-primary)" width={25} height={25} />
					</a>
				</RoomTypeCard>
			</a>
		{/each}
	</section>
{:else}
	<div class="no-rooms section--sm">
		<h3>You don't have any room types.</h3>
		<p>Create a room type which can be used to manage room stock, and information.</p>
		<Button style="border" size="small" icon="fluent:add-square-24-regular" href="rooms/create"
			>Add Room Type</Button
		>
	</div>
{/if}

<style lang="scss">
	.no-rooms {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		justify-content: center;
		max-width: 40ch;
		gap: var(--space-2xs);
		margin: 0 auto;

		p {
			margin-bottom: var(--space-xs);
		}
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.edit-action {
		padding: var(--space-2xs);
		border-radius: 50%;
		transition: background-color 0.15s ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			background-color: rgba(146, 146, 146, 0.103);
		}
	}
	.edit-card {
		transition: transform 0.25s ease-in-out;

		&:hover {
			transform: translateY(-1px);
		}
		&:hover .edit-action {
			background-color: rgba(146, 146, 146, 0.103);
		}
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-xs);
	}
</style>
