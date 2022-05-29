<script lang="ts">
	import { fade, slide, fly } from 'svelte/transition';
	import LocalIcon from './LocalIcon.svelte';

	export let imgSrc: string;
	export let imgAlt: string | null = null;
	export let rating: number;
	export let ratingTotal: number;
	export let title: string;
	export let subtitle: string;
	export let active: boolean = false;
	export let overlay: boolean = true;

	export let cardWidth: number;
</script>

<div class="card" style:min-width="{cardWidth}px" bind:clientWidth={cardWidth}>
	<div class="card__image-wrap">
		<img src={imgSrc} alt={imgAlt ?? 'location in Naples'} />
		{#if overlay}<div class="overlay overlay--light" /> {/if}
	</div>

	{#if active}
		<div class="details" transition:fade={{ duration: 400 }}>
			<h5 class="details__rating">
				<LocalIcon icon="star" fill="var(--color-primary)" size="1em" />
				{rating} <span class="details__rating-total">({ratingTotal})</span>
			</h5>
			<h4 class="details__title">{title}</h4>
			<h5 class="details__subtitle">{subtitle}</h5>
		</div>
	{/if}
</div>

<style lang="scss">
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);

		img {
			border-radius: var(--br-lg);
			object-fit: cover;
			height: 100%;
			width: 100%;
			display: block;
		}

		&__image-wrap {
			max-height: 432px;
			position: relative;
			box-shadow: var(--shadow-image);
		}
	}

	.details {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);

		&__title {
			font-size: var(--text-base-lg);
		}
		&__rating {
			display: inline-flex;
			align-items: center;
			gap: var(--space-3xs);
		}
		&__rating-total {
			color: var(--color-gray-muted);
		}

		&__subtitle {
			color: var(--color-gray-muted);
		}
	}

	@media screen and (max-width: 768px) {
		.details {
			width: 90%;
			left: 50%;
			transform: translateX(-50%);
			position: absolute;
			bottom: 1rem;
			padding: var(--space-xs);
			border-radius: 7px;
			background-color: var(--color-white);
		}

		.card {
			min-width: 100% !important;
		}
	}
</style>
