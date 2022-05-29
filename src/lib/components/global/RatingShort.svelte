<script lang="ts">
	import LocalIcon from './LocalIcon.svelte';

	export let rating: number;
	export let ratingTotal: number;
</script>

<h5 class="rating">
	<LocalIcon icon="star" fill="var(--color-primary)" size="1em" />
	{rating} <span class="rating__total">({ratingTotal})</span>
</h5>

<style lang="scss">
	.rating {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3xs);

		&__total {
			color: var(--color-gray-muted);
		}
	}
</style>
