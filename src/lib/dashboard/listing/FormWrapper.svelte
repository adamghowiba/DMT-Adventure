<script lang="ts">
	import TextInput from '$lib/components/input/TextInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import FormEditCard from './forms/FormEditCard.svelte';

	export let title: string;
	export let value: string = 'Not set';
	export let isEditing: boolean = false;

	const handleCancelEvent = () => {
		isEditing = false;
		dispatch('cancel');
	};

	const handleSaveEvent = () => {
		isEditing = false;
		dispatch('save');
	}

	const dispatch = createEventDispatcher();
</script>

{#if isEditing}
	<FormEditCard on:exit={handleCancelEvent} on:cancel={handleCancelEvent} on:save={handleSaveEvent}>
		<slot name="input" />
	</FormEditCard>
{:else}
	<div class="wrapper">
		<header>
			<span class="title">{title}</span>
			<button on:click={() => (isEditing = !isEditing)}>Edit</button>
		</header>
		<div class="wrapper__value">
			<slot name="value">
				{value || 'Not set'}
			</slot>
		</div>
	</div>
{/if}

<style lang="scss">
	button {
		appearance: none;
		background-color: transparent;
		border: none;
		outline: none;
		font-family: inherit;
		color: var(--color-text-body);
		padding: 0;
		margin: 0;
		text-decoration: underline;
		padding: var(--space-3xs);
		border-radius: var(--br-sm);
		transition: background-color 0.15s linear;

		&:hover {
			cursor: pointer;
			background-color: rgba(92, 92, 92, 0.068);
		}
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.wrapper {
		padding-bottom: var(--space-sm);
		border-bottom: 1px solid var(--color-trans);
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);

		.title {
			text-transform: capitalize;
			color: var(--color-text-heading);
		}

		&__value {
			color: var(--color-gray-muted);
		}
	}
</style>
