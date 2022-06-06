<script lang="ts">
	export let title: string;
</script>

<section>
	<h2>{title}</h2>
	<div class="content">
		<slot />
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}
</style>
