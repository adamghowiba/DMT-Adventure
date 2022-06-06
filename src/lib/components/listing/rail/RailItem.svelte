<script lang="ts">
	export let title: string;
	export let price: number;
	export let description: string | null = null;
	export let descriptionItems: string[] = [];
</script>

<div class="item">
	<div class="details">
		<h5 class="details__title">{title}</h5>
		{#if description}
			<span>{description}</span>
		{/if}

		{#if descriptionItems.length}
			{#each descriptionItems as item}
				<li>{item}</li>
			{/each}
		{/if}
	</div>

	<div class="item__price">
		${price}
	</div>
</div>

<style lang="scss">
	.item {
		display: flex;
		justify-content: space-between;
	}

	.details {
		display: flex;
		flex-direction: column;
		gap: 4px;
		max-width: 20ch;

		&__title {
			font-size: var(--text-base-lg);
		}

		li {
			margin-left: var(--space-2xs);
			text-transform: capitalize;
		}

		span,
		li {
			font-size: var(--text-h6);
			color: var(--color-gray-muted);
		}
	}
</style>
