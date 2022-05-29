<script lang="ts">
	import Button from '$lib/components/global/Button.svelte';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="card">
	<div class="card__body">
		<div class="card__exit-icon" on:click={() => dispatch('exit')}>
			<Icon icon="eva:close-fill" width={22} height={22} color="var(--color-gray-muted)" />
		</div>
		<slot />
	</div>

	<footer class="footer">
		<Button size="small" style="empty" on:click={() => dispatch('cancel')}>Cancel</Button>
		<Button size="small" on:click={() => dispatch('save')}>Save</Button>
	</footer>
</div>

<style lang="scss">
	.card {
		border: 1px solid var(--color-trans);
		border-radius: var(--br-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);

		&__body {
			position: relative;
			padding: var(--space-sm);
		}

		&__exit-icon {
			position: absolute;
			right: var(--space-sm);
			top: var(--space-xs);
			padding: 2px;
			border-radius: 50%;

			transition: background-color 0.15s linear;
		}

		&__exit-icon:hover {
			background-color: rgba(92, 92, 92, 0.068);
		}
	}
	footer {
		align-items: center;
		padding: var(--space-xs) var(--space-sm);
		border-top: 1px solid var(--color-trans);
		display: flex;
		justify-content: space-between;
	}
</style>
