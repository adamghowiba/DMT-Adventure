<script lang="ts">
	import RailItem from '../listing/rail/RailItem.svelte';
	import RailTotal from '../listing/rail/RailTotal.svelte';
	import RailListing from './RailListing.svelte';

	export let thumbnail: string;
	export let title: string;
	// export let railItems: { price: string; title: string; description?: string }[];
</script>

<div class="rail">
	<RailListing {thumbnail} {title} subtitle="Entire Villa" />
	<hr />
	<div class="rail__items">
		<h3>Price details</h3>
		<slot />
		<RailItem price={12.32} title="Service fee" />
	</div>
	<hr />
	<div class="rail__total">
		<RailTotal total={894} footnote={null} />
	</div>
</div>

<style lang="scss">
	.rail {
		width: 100%;
		position: sticky;
		top: var(--space-sm);
		border: 1px solid var(--color-trans);
		padding: var(--space-sm) var(--space-xs);
		border-radius: var(--br-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		height: max-content;

		&__items {
			display: flex;
			flex-direction: column;
			gap: var(--space-sm);
		}

		&__total {
			padding: var(--space-23xs) 0;
		}

		h3 {
			line-height: normal;
		}
	}
	hr {
		width: 100%;
		border: none;
		border-top: 1px solid var(--color-trans);
	}
</style>
