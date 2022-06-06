<script lang="ts">
	export let gap: string | null = null;
	export let title: string | null = null;
	export let hr: boolean = true;
</script>

<section class:hr style="--gap: {gap}">
	{#if title}
		<h3>{title}</h3>
	{/if}

	<div class="content" class:flex={gap}>
		<slot />
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);

		&.hr {
			padding-bottom: var(--space-md);
			border-bottom: 1px solid var(--color-trans);
		}

		.content.flex {
			display: flex;
			flex-direction: column;
			gap: var(--gap);
		}
	}
</style>
