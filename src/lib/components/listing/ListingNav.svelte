<script lang="ts">
	import type { Link } from '$lib/types/link-context';
	import Button from '../global/Button.svelte';
	
	export let isReserveVisible: boolean = false;
	export let linkStore: Link[];
	export let bookingUrl: string;

	const scrollTo = (element: HTMLElement | undefined, offset = 70) => {
		if (!element) return;

		window.scrollTo({ top: element.offsetTop - offset, behavior: 'smooth' });
	};
</script>

<nav class="nav">
	<div class="links container">
		<div class="links__items">
			{#each linkStore as link}
				<div class="links__link" on:click={() => scrollTo(link.element)}>
					<h5>{link.name}</h5>
				</div>
			{/each}
		</div>

		{#if isReserveVisible}
			<div class="reserve">
				<div class="reserve__price">
					<em>$148</em>
					night
				</div>
				<Button href={bookingUrl}>Reserve</Button>
			</div>
		{/if}
	</div>
</nav>

<style lang="scss">
	.nav {
		position: fixed;
		top: 0;
		background-color: var(--color-white);
		box-shadow: var(--shadow-image);
		width: 100%;
		height: 80px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--color-trans);
		z-index: 10;
	}
	.links {
		display: flex;
		justify-content: space-between;
		gap: var(--space-xl);
		align-items: center;

		&__items {
			display: flex;
			gap: var(--space-sm);
			text-transform: capitalize;
		}

		&__link {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 80px;
			border-bottom: 4px solid transparent;

			transition: border-bottom 0.2s ease-out;
		}

		&__link:hover {
			cursor: pointer;
			border-bottom: 4px solid var(--color-primary);
		}
	}
	.reserve {
		display: flex;
		gap: var(--space-xs);
		align-items: center;

		em {
			font-size: 18px;
			font-weight: var(--fw-medium);
			color: var(--color-midnight);
		}
	}
</style>
