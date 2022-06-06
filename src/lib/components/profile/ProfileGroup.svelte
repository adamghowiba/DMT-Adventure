<script lang="ts">
	export let title: string;
</script>

<div class="group">
	<h4>{title}</h4>
	<slot />
</div>

<style lang="scss">
	.group {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
</style>
