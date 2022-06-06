<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import FormEditCard from './forms/FormEditCard.svelte';
	
	export let title: string | null = null;
	export let value: string = 'Not set';
	export let isEditing: boolean = false;
	export let href: string | null = '';

	const handleCancelEvent = () => {
		isEditing = false;
		dispatch('cancel');
	};

	const handleSaveEvent = () => {
		isEditing = false;
		dispatch('save');
	};

	const dispatch = createEventDispatcher();
</script>

{#if isEditing}
	<FormEditCard on:exit={handleCancelEvent} on:cancel={handleCancelEvent} on:save={handleSaveEvent}>
		<slot name="input" />
	</FormEditCard>
{:else}
	<div class="wrapper">
		<div class="wrapper__left">
			<span class="title">{title ?? ''}</span>

			<div class="wrapper__value">
				<slot name="value">
					{value || 'Not set'}
				</slot>
			</div>
		</div>

		<header>
			{#if href}
				<a {href} class="link">
					Edit
					<Icon icon="akar-icons:chevron-left" rotate={2} color="inherit" width={16} height={16} />
				</a>
			{:else}
				<button on:click={() => (isEditing = !isEditing)}>Edit</button>
			{/if}
		</header>
	</div>
{/if}

<style lang="scss">
	button,
	a {
		appearance: none;
		background-color: transparent;
		border: none;
		outline: none;
		font-family: inherit;
		color: var(--color-text-body);
		padding: 0;
		font-size: var(--text-h5);
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
	.link {
		display: flex;
		align-items: center;
		gap: var(--space-2xs);
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		position: relative;
		min-width: 40px;

		button {
			position: absolute;
			right: 0;
			top: -8px;
		}
	}

	.wrapper {
		padding-bottom: var(--space-sm);
		border-bottom: 1px solid var(--color-trans);
		display: flex;
		// flex-direction: column;
		justify-content: space-between;
		gap: var(--space-2xs);

		&__left {
			display: flex;
			flex-direction: column;
			gap: var(--space-2xs);
		}

		.title {
			text-transform: capitalize;
			color: var(--color-text-heading);
		}

		&__value {
			color: var(--color-gray-muted);
		}
	}
</style>
