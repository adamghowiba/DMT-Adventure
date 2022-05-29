<script lang="ts">
	import type { Room } from '$lib/types/listing';
	import RoomCard from './RoomCard.svelte';

	export let rooms: Room[];
</script>

<section class="rooms">
	{#each rooms as room}
		{#if room.quantity}
			<RoomCard {room} on:reserveSelected />
		{/if}
	{/each}
</section>

<style lang="scss">
	.rooms {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-md);
	}
</style>
