<script lang="ts">
	let items = ['profile', 'settings', 'review'];
</script>

<aside class="sidebar">
	{#each items as item}
		<div class="sidebar__item">
			<h4>{item}</h4>
		</div>
	{/each}
</aside>

<style lang="scss">
	.sidebar {
		background-color: var(--color-offwhite);
		width: 100%;
		max-width: 257px;
		border-radius: var(--br-sm);
		box-shadow: var(--shadow-image);
		height: min-content;
		position: sticky;
		top: var(--space-md);

		&__item {
			display: flex;
			align-items: center;
			padding: var(--space-md);
		}

		&__item:nth-child(1) {
			border-left: 3px solid var(--color-midnight);
		}

		h4 {
			text-transform: capitalize;
		}

		&__item:not(:first-child) {
			border-top: 1px solid var(--color-trans);
		}
	}
</style>
