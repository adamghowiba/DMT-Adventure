<script lang="ts">
	import RatingStars from '../global/RatingStars.svelte';
	
	export let rating: number;
	export let ratingTotal: number;
</script>

<header class="header">
	<div class="rating">
		<h1>{rating}</h1>

		<div class="rating__details">
			<RatingStars {rating} />
			<h5>{ratingTotal} reviews</h5>
		</div>
	</div>
</header>

<style lang="scss">
	.rating {
		display: flex;
		align-items: center;
		gap: var(--space-xs);

		h1 {
			font-size: 40px;
		}
	}
</style>
