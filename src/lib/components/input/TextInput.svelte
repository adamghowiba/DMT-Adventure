<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let type: 'text' | 'email' | 'date' | 'div' | 'number' = 'text';
	export let placeholder: string | null = null;
	export let focusStyle: 'top' | 'inner' | 'none' = placeholder ? 'inner' : 'none';
	export let name: string;
	export let value: any = '';
	export let required: boolean = false;
	export let autoComplete: boolean = false;
	export let disabled: boolean = false;
	export let readonly: boolean = false;

	/* STYLES */
	export let textTransform: 'capitalize' | 'uppercase' | 'none' = 'none';
	export let maxWidth: string = 'none';
	export let width: string = '100%';
	export let borderRadius = 'var(--br-sm)';
	export let borderColor: string = 'var(--color-gray-light)';

	let error: boolean = false;

	const dispatch = createEventDispatcher();

	const handleInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const valid = target.checkValidity();
		error = !valid;
	};

	const handleBlur = (event: Event) => {
		handleInput(event);
		dispatch('blur', event);
	};
</script>

<div
	class="wrapper"
	class:error
	on:click
	style:text-transform={textTransform}
	style="--borderRadius: {borderRadius}; --maxWidth: {maxWidth}; --width: {width}; --borderColor: {borderColor};"
>
	{#if type === 'text'}
		<input
			type="text"
			autocomplete={autoComplete ? 'on' : 'off'}
			class:entered={value}
			class={focusStyle}
			{name}
			{required}
			{disabled}
			{readonly}
			bind:value
			on:blur={handleBlur}
			on:input={handleInput}
			on:focus
		/>
	{:else if type === 'email'}
		<input
			type="email"
			{name}
			{disabled}
			{required}
			{readonly}
			autocomplete={autoComplete ? 'on' : 'off'}
			bind:value
		/>
	{:else if type === 'date'}
		<input
			type="date"
			class:entered={true}
			class={focusStyle}
			{name}
			{disabled}
			{required}
			{readonly}
			autocomplete={autoComplete ? 'on' : 'off'}
			bind:value
		/>
	{:else if type === 'number'}
		<input
			type="number"
			class:entered={value}
			autocomplete={autoComplete ? 'on' : 'off'}
			class={focusStyle}
			{name}
			{required}
			{disabled}
			{readonly}
			bind:value
			on:focus
			on:blur={handleInput}
			on:input={handleInput}
		/>
	{/if}

	{#if placeholder}
		<div class="placeholder {focusStyle}" class:entered={value}>
			<span>
				{placeholder}
			</span>
		</div>
	{/if}
</div>

<style lang="scss">
	@mixin entered {
		transform: translateY(-100%);
		font-size: 12px;
	}

	@mixin halfEntered {
		transform: translateY(-72%);
		font-size: 12px;
	}

	.wrapper {
		width: var(--width);
		max-width: var(--maxWidth);
		position: relative;
	}
	input {
		appearance: none;
		width: var(--width);

		border: none;
		background-color: transparent;
		text-transform: inherit;
		padding: var(--space-xs);
		border-radius: var(--borderRadius, var(--br-sm));
		outline: none;
		font-size: var(--text-base-lg);
		min-height: 56px;
		transition: border 0.1s ease-out;
		color: var(--color-text-body);
		border: 1px solid var(--borderColor);

		&:disabled {
			appearance: none;
			-webkit-appearance: none;
			opacity: 1;
			color: var(--color-text-body);
		}

		&:focus {
			border: 1px solid var(--color-primary);
			border-bottom-width: 2px;
		}

		&.inner {
			height: 56px;
			transition: padding-bottom 0.15s ease-in-out;
		}

		&.inner.entered,
		&.inner:focus {
			padding-top: calc(var(--space-xs) + 2px);
			padding-bottom: 0px;
		}

		/* Focus Styles */
		&.inner:focus + .placeholder,
		&.inner.entered + .placeholder {
			@include halfEntered;
		}

		&.top:focus + .placeholder,
		&.entered.top + .placeholder {
			@include entered;
		}
	}

	.error input {
		border: 1px solid var(--color-red);
		background-color: rgba(243, 62, 62, 0.178);
	}
	.placeholder {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: var(--space-xs);
		text-transform: capitalize;
		height: 100%;
		display: flex;
		align-items: center;
		transition: transform 0.18s ease-out, font-size 0.15s ease-out;
		pointer-events: none;

		span {
			padding: 0 2px;
			color: var(--color-gray-light);
			background-color: transparent;
		}
	}
</style>
