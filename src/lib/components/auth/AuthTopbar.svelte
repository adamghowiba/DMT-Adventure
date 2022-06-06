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
			<a class="link" href="/forgot">Sign Up</a>
		</div>
	{/if}
</div>

<style lang="scss">
	.topbar {
		display: flex;
		justify-content: space-between;
		text-align: right;
		align-items: center;

		&__action {
			position: relative;
			top: -5px;
			display: flex;
			align-items: center;
			gap: var(--space-sm);
		}

		a {
			color: var(--color-primary);
			font-weight: var(--fw-semi-bold);
			text-decoration: underline;
		}
	}

	@media screen and (max-width: 1024px) {
		.topbar {
			&__action {
				gap: var(--space-2xs);
			}
		}
	}
</style>
