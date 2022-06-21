<script lang="ts">
	import Icon from '@iconify/svelte';

	export let items: { name: string; value?: any }[];
	export let placeholder: string | null = null;
	export let value: any = placeholder;

	$: unselected = value === placeholder;
</script>

<div class="wrap">
	<select placeholder="adam" class:unselected bind:value class:entered={!unselected}>
		<option default disabled selected hidden class="default" />
		{#each items as item}
			<option value={item?.value || item.name}>{item.name}</option>
		{/each}
	</select>

	{#if placeholder}
		<div class="placeholder" class:entered={!unselected}>
			<span>
				{placeholder}
			</span>
		</div>
	{/if}

	<div class="select-icon">
		<Icon icon="akar-icons:chevron-down" height={15} width={15} />
	</div>
</div>

<style lang="scss">
	@mixin entered {
		transform: translateY(-72%);
		font-size: 12px;
	}

	.wrap {
		width: 100%;
		position: relative;
		pointer-events: all;
	}
	.placeholder {
		position: absolute;
		top: 50%;
		min-height: 56px;
		transform: translateY(-50%);
		left: var(--space-xs);
		text-transform: capitalize;
		height: 100%;
		display: flex;
		align-items: center;
		transition: transform 0.18s ease-out, font-size 0.15s ease-out;
		pointer-events: none;
		font-size: var(--text-base);

		span {
			padding: 0 2px;
			color: var(--color-gray-light);
		}

		&.entered {
			@include entered;
		}
	}

	select {
		width: 100%;
		appearance: none;
		border: none;
		background-color: transparent;
		font-weight: var(--fw-regular);
		padding: var(--space-xs);
		border-radius: var(--borderRadius, var(--br-lg));
		border: 1px solid var(--color-gray-light);
		outline: none;
		font-size: var(--text-base-lg);
		transition: border 0.1s ease-out;
		color: var(--color-text-body);
		text-transform: capitalize;
		font-family: inherit;
		min-height: 56px;

		&.entered {
			padding-bottom: 0;
		}

		&.unselected {
			color: var(--color-gray-light);
		}
	}
	option {
		text-transform: capitalize;
		color: var(--color-text-body);
	}
	.select-icon {
		position: absolute;
		right: var(--space-xs);
		pointer-events: none;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
