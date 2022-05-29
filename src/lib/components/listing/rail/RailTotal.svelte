<script lang="ts">
	export let total: number;
	export let footnote: string | null = 'Includes fess, not tax';
</script>

<div class="total">
	<div class="total__left">
		<h4>Total</h4>
		{#if footnote}
			<span class="total__cursor">Includes fess, not tax</span>
		{/if}
	</div>

	<h4>${total}</h4>
</div>

<style lang="scss">
	.total {
		display: flex;
		justify-content: space-between;

		&__left {
			display: flex;
			flex-direction: column;
			gap: var(--space-3xs);
		}
	}
</style>
