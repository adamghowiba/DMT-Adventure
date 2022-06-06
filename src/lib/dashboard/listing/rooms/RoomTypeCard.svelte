<script lang="ts">
	import type { Room } from '$lib/types/listing';
	import { createEventDispatcher } from 'svelte';
	
	export let room: Room;
	export let selected: boolean = false;

	const dispatch = createEventDispatcher();

	export const handleReserveAction = () => {
		selected = !selected;
		dispatch('reserveSelected', room);
	};
</script>

<div class="room" class:selected>
	<div class="room__images">
		{#if room.images}
			<img src={room.images} alt="" />
		{/if}
	</div>

	<div class="body">
		<h4>{room.name}</h4>

		<div class="info">
			<div class="info__item">
				<em>Beds - </em>
				{#each room.beds as beds, i}
					<span> {beds.count} {beds.type} {i < room.beds.length - 1 ? '/ ' : ''} </span>
				{/each}
			</div>
			<span><em>Type</em> - Suite</span>
		</div>

		<div class="footer">
			<div class="footer__price">
				<h3>${room.price}</h3>
				<span>per night</span>
			</div>

			<!-- TODO: -->
			<div class="reserve">
				<slot />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	em {
		font-weight: var(--fw-semi-bold);
	}
	.room {
		width: 100%;
		background-color: var(--color-white);
		border-radius: var(--br-lg);
		border: 1px solid transparent;

		&__images {
			width: 100%;
			height: 150px;
			border-top-right-radius: inherit;
			border-top-left-radius: inherit;
		}

		img {
			border-top-right-radius: inherit;
			border-top-left-radius: inherit;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		&.selected {
			border: 1px solid var(--color-primary);
		}
	}

	.body {
		padding: var(--space-xs);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);

		&__item {
			text-transform: capitalize;
		}
	}

	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: var(--space-3xs);

		h3 {
			line-height: 1em;
		}
	}
</style>
