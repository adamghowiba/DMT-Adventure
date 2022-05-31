<script lang="ts">
	import ListingBar from '$lib/dashboard/listing/ListingBar.svelte';
</script>

<main>
	<ListingBar activeSection="details" />

	<div class="details">
		<slot />
	</div>
</main>

<style lang="scss">
	.details {
		background-color: var(--color-white);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}
	.filler {
		height: 50vh;
	}
	main {
		position: relative;
		display: grid;
		gap: var(--space-lg);
		grid-template-columns: auto 1fr;
	}
</style>
