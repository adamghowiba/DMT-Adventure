<script lang="ts">
	import Button from '../global/Button.svelte';
	export let createAction: boolean = true;
</script>

<div class="topbar">
	<a href="/">
		<img src="/images/logo.png" alt="" />
	</a>

	{#if createAction}
		<div class="topbar__action">
			<span>Don’t have an account? </span>

			<Button style="border" href="/signup">Create One</Button>
		</div>
	{/if}
</div>

<style lang="scss">
	.topbar {
		display: flex;
		justify-content: space-between;
		padding: var(--space-xs);

		&__action {
			display: flex;
			align-items: center;
			gap: var(--space-sm);
		}
	}
</style>
