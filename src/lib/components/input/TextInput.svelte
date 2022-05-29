<script lang="ts">
	export let type: 'text' | 'email' | 'date' | 'div' = 'text';
	export let placeholder: string | null = null;
	export let name: string;
	export let value: string = '';
	export let focusStyle: 'top' | 'inner' | 'none' = placeholder ? 'inner' : "none";

	export let borderRadius = 'var(--br-lg)';
	export let disabled: boolean = false;
	export let maxWidth: string = 'none';
	export let width: string = '100%';
</script>

<div
	class="wrapper"
	on:click
	style="--borderRadius: {borderRadius}; --maxWidth: {maxWidth}; --width: {width};"
>
	{#if type === 'text'}
		<input
			type="text"
			class:entered={value}
			class={focusStyle}
			{name}
			{disabled}
			bind:value
			on:focus
			on:blur
		/>
	{:else if type === 'email'}
		<input type="email" {name} {disabled} bind:value />
	{:else if type === 'date'}
		<input type="date" {name} {disabled} bind:value />
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
		padding: var(--space-xs);
		border-radius: var(--borderRadius, var(--br-lg));
		border: 1px solid var(--color-gray-light);
		outline: none;
		font-size: 16px;
		height: 50px;
		transition: border 0.1s ease-out;

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
			background-color: var(--color-white);
		}
	}
</style>
