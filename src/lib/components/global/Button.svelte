<script lang="ts">
	import Icon from '@iconify/svelte';

	interface IconStyles {
		icon: string;
		location: 'left' | 'right';
		color: string;
		size: number;
	}

	type PartialIcon = Partial<IconStyles>;

	export let href: string | null = null;
	export let style: 'border' | 'filled' | 'empty' = 'filled';
	export let borderRadius: 'round' | 'base' | 'square' = 'base';
	export let size: 'small' | 'large' | 'base' = 'base';
	export let color: keyof typeof COLORS = 'purple';
	export let icon: PartialIcon | string | null = null;
	export let width: string = 'auto';
	export let height: string = 'auto';

	const COLORS = {
		purple: 'var(--color-primary)',
		black: 'var(--color-gray-dark)'
	};

	const DEFAULT_ICON_STYLES: IconStyles = {
		icon: 'akar-icons:check',
		location: 'left',
		color: 'inherit',
		size: 15
	};

	const iconStyles = (): IconStyles => {
		if (typeof icon === 'object') return { ...DEFAULT_ICON_STYLES, ...icon };
		if (typeof icon === 'string') return { ...DEFAULT_ICON_STYLES, icon };

		return DEFAULT_ICON_STYLES;
	};

	const buttonStyles = `${size} ${style} ${borderRadius} icon--${iconStyles().location}`;
</script>

<div class="button-wrap" style="--buttonColor: {COLORS[color]}; --width: {width}; --height: {height};">
	{#if href}
		<a {href} class={buttonStyles}>
			<slot />
			{#if icon}
				<Icon
					icon={iconStyles().icon}
					color={iconStyles().color}
					width={iconStyles().size}
					height={iconStyles().size}
				/>
			{/if}
		</a>
	{:else}
		<button class={buttonStyles} on:click>
			{#if icon}
				<Icon
					icon={iconStyles().icon}
					color={iconStyles().color}
					width={iconStyles().size}
					height={iconStyles().size}
				/>
			{/if}
			<slot />
		</button>
	{/if}
</div>

<style lang="scss">
	.button-wrap {
		width: var(--width);
	}
	
	button {
		appearance: none;
		background-color: transparent;
		border: none;
	}

	a,
	button {
		font-size: var(--text-button);
		display: inline-flex;
		gap: var(--space-2xs);
		justify-content: center;
		align-items: center;
		font-weight: inherit;
		line-height: var(--line-sm);
		font-weight: var(--fw-medium);
		letter-spacing: 0px;
		font-family: var(--font-family);
		border-radius: var(--br-sm);
		padding: 14px 24px;
		width: var(--width);
		height: var(--height);

		/* Size */
		&.large {
			padding: 16px 40px;
			font-size: var(--text-base-lg);
		}
		&.small {
			padding: 8px 16px;
		}

		/* Border Radius */
		&.round {
			border-radius: 50px;
		}
		&.square {
			border-radius: 0px;
		}

		/* Style */
		&.filled {
			background-color: var(--buttonColor);
			color: var(--color-white);
		}
		&.border {
			background-color: transparent;
			border: 1px solid var(--buttonColor);
			color: var(--buttonColor);
		}
		&.empty {
			border: none;
			background-color: transparent;
			color: var(--buttonColor);
		}

		/* Icon Location */
		&.icon--right {
			flex-direction: row-reverse;
		}

		&:hover {
			cursor: pointer;
		}
	}
</style>
