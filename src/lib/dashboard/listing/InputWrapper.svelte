<script lang="ts">
	export let title: string;
	export let description: string | null = null;
</script>

<div class="input-wrap">
	<h4>{title}</h4>
	{#if description}
		<span class="input-wrap__description">{description}</span>
	{/if}

	<div class="input-wrap__input">
		<slot />
	</div>
</div>

<style lang="scss">
	.input-wrap {
		display: flex;
		flex-direction: column;
		gap: var(--space-3xs);

		h4 {
			font-size: 16px;
		}

		&__input {
			display: flex;
			flex-direction: column;
			gap: var(--space-md);
			padding-top: var(--space-xs);
		}

		&__description {
			color: var(--color-gray-muted);
			font-size: var(--text-sm);
			line-height: var(--line-base);
		}
	}
</style>
