<script lang="ts">
	import { browser } from '$app/env';
	import Button from '$lib/components/global/Button.svelte';
	import { createEventDispatcher,onDestroy } from 'svelte';
	import RailTotal from './RailTotal.svelte';
	
	export let total: number;
	export let bookingDays: number;
	export let bookingUrl: string;

	let buttonWrapElement: HTMLElement;
	let intersectionObserver: IntersectionObserver;

	const dispatch = createEventDispatcher();

	const handleScrollPastButton: IntersectionObserverCallback = (entries, observer) => {
		const [element] = entries;

		if (!element.isIntersecting) {
			dispatch('bookIntersection', false);
			return;
		}

		dispatch('bookIntersection', true);
	};

	onDestroy(() => {
		if (intersectionObserver) intersectionObserver.disconnect();
	});

	$: if (browser && buttonWrapElement) {
		const observer = new IntersectionObserver(handleScrollPastButton, { rootMargin: '-80px' });
		observer.observe(buttonWrapElement);
		intersectionObserver = observer;
	}

	$: if (intersectionObserver && !buttonWrapElement) intersectionObserver.disconnect();
</script>

<div class="rail">
	{#if total}
		<h4>${total / bookingDays} /night</h4>
		<div class="rail__items">
			<slot />
			<hr />
			<RailTotal {total} />
		</div>

		<div class="book">
			<div class="button-wrap" bind:this={buttonWrapElement}>
				<Button size="base" href={bookingUrl} width="100%">Book now</Button>
			</div>
			<span>Free cancellation until <a href="" class="book__link">May 28, 2022</a></span>
		</div>
	{:else}
		<h4>Select room for pricing</h4>
		<span>Free cancellation until <a href="" class="book__link">May 28, 2022</a></span>
	{/if}
</div>

<style lang="scss">
	.rail {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		position: sticky;
		top: 6rem;
		width: 330px;
		height: min-content;
		box-shadow: var(--shadow-image);
		background-color: var(--color-white);
		border: 1px solid var(--color-trans);
		border-radius: var(--br-lg);
		padding: var(--space-md);

		&__items {
			display: flex;
			flex-direction: column;
			gap: var(--space-sm);
		}
	}

	.book {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
		text-align: center;

		&__link {
			color: var(--color-primary);
		}
	}

	hr {
		margin: 0;
		padding: 0;
		border: none;
		border-top: 1px solid var(--color-trans);
	}

	// Laptop
	@media screen and (max-width: 1024px) {
		.rail {
			width: auto;
		}
	}
	
	@media screen and (max-width: 597px) {
		.rail {
			top: 2rem;
		}
	}
</style>
