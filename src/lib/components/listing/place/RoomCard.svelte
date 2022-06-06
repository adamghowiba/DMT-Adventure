<script lang="ts">
	import Button from '$lib/components/global/Button.svelte';
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
			<li class="info__item">
				{#each room.beds as beds, i}
					<span>{beds.count} {beds.type} {i < room.beds.length - 1 ? '/ ' : ''} </span>
				{/each}
				<span>Bed</span>
			</li>

			<li class="info__item">Resever now pay later</li>
		</div>

		<div class="footer">
			<div class="footer__price">
				<h3>${room.price}</h3>
				<span>per night</span>
			</div>

			<!-- TODO: -->
			<div class="reserve">
				{#if selected}
					<Button size="small" style="empty" icon="akar-icons:check" on:click={handleReserveAction}>
						Selected
					</Button>
				{:else}
					<Button size="small" on:click={handleReserveAction}>Reserve</Button>
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.room {
		width: 100%;
		background-color: var(--color-offwhite);
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
		align-items: flex-end;
		margin-top: var(--space-3xs);

		h3 {
			line-height: 1em;
		}
	}
</style>
