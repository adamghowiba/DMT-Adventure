<script lang="ts">
	import Button from '$lib/components/global/Button.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let saveActionName = 'Save';
	export let disabled: boolean = false;
</script>

<div class="bar">
	<Button style="empty" icon="akar-icons:chevron-left" on:click={() => dispatch('back')}>Go back</Button>
	<Button on:click={() => dispatch('save')} disabled={disabled}>{saveActionName}</Button>
</div>

<style lang="scss">
	.bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		border-top: 1px solid var(--color-trans);
		background-color: var(--color-white);
		box-shadow: var(--shadow-image);
		padding: var(--space-xs);
		display: flex;
		justify-content: space-between;
	}
</style>
