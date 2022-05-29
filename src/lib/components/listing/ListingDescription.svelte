<script lang="ts">
</script>

<div class="description">
	<p><slot /></p>
</div>

<style lang="scss">
	.description {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);

		p {
			line-height: var(--line-md);
		}
	}
</style>
