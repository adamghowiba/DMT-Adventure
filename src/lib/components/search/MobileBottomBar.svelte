<script lang="ts">
	import { transformTripDates } from '$lib/helpers/date-helper';
	import Button from '../global/Button.svelte';

	export let price: number;
	export let href: string;
	export let checkIn: Date;
	export let checkOut: Date;
</script>

<div class="bar">
	{#if price}
		<div class="details">
			<h4>${price}</h4>
			<span>{transformTripDates(checkIn, checkOut)}</span>
		</div>

		<Button {href}>Reserve</Button>
	{:else}
		<div class="no-selected">
			<h4>Select room for pricing.</h4>
			<span>Free cancellation until <a class="link">May 28, 2022</a></span>
		</div>
	{/if}
</div>

<style lang="scss">
	.bar {
		display: none;
		position: fixed;
		bottom: 0;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-xs);
		width: 100%;
		background-color: var(--color-white);
		border-top: 1px solid var(--color-trans);
	}
	.no-selected {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
		margin: var(--space-2xs) auto;
	}
	.link {
		color: var(--color-primary);
	}

	@media only screen and (max-width: 597px) {
		.bar {
			display: flex;
		}
	}
</style>
