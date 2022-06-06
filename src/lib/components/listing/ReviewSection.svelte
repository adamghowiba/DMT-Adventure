<script lang="ts">
	import type { Review as ReviewType } from '$lib/types/listing';
	import Button from '../global/Button.svelte';
	import ListingWrapper from './ListingWrapper.svelte';
	import Review from './Review.svelte';
	import ReviewHeader from './ReviewHeader.svelte';
	
	export let reviews: ReviewType[] | undefined;

	let defaultReviewCount = 6;
	let reviewCount: number = defaultReviewCount;

	const handleShowReviews = () => {
		reviewCount += 4;
	};
</script>

<ListingWrapper title="Reviews" gap="var(--space-md)" navTitle="reviews">
	<ReviewHeader rating={4.4} ratingTotal={12} />

	<!-- TODO: Aggrgate reviews -->
	<div class="reviews">
		{#if reviews}
			{#each reviews.slice(0, reviewCount) as { name, date, thumbnail, content }}
				<Review {name} {date} {thumbnail} {content} />
			{/each}
		{/if}
	</div>

	<div class="actions">
		<Button style="border" size="small" color="black" on:click={handleShowReviews}>
			Show more reviews
		</Button>
		{#if reviewCount > defaultReviewCount}
			<span on:click={() => (reviewCount = defaultReviewCount)}>Hide reviews</span>
		{/if}
	</div>
</ListingWrapper>

<style lang="scss">
	.reviews {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-lg);
	}
	.actions {
		display: flex;
		align-items: center;
		gap: var(--space-xs);

		span {
			text-decoration: underline;
		}

		span:hover {
			cursor: pointer;
		}
	}

	@media screen and (max-width: 597px) {
		.reviews {
			grid-template-columns: 1fr;
		}
	}
</style>
