<script lang="ts">
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';

	export let icon: string;
	export let dropdownLinks: string[] = [];
	export let iconSize: number = 23;
	export let href: string | null = null;

	let isDropdownOpen: boolean = false;
</script>

<div class="wrapper" class:isDropdownOpen>
	{#if href && !dropdownLinks.length}
		<a class="wrapper__link" {href} />
	{/if}
	<div class="link" on:click={() => (isDropdownOpen = !isDropdownOpen)}>
		<Icon {icon} width={iconSize} height={iconSize} color="var(--color-text-body)" />

		<span>
			<slot />
		</span>

		{#if dropdownLinks.length}
			<div class="link__dropdown-icon">
				<Icon
					icon="akar-icons:chevron-down"
					width={15}
					height={15}
					rotate={isDropdownOpen ? 2 : 0}
				/>
			</div>
		{/if}
	</div>

	{#if dropdownLinks.length && isDropdownOpen}
		<div class="dropdown" transition:slide={{ duration: 200 }}>
			{#each dropdownLinks as link}
				<a href="/" class="dropdown__link">{link}</a>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.link {
		min-height: 56px;
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		// gap: var(--space-sm);
		padding: var(--space-xs);
		border-top: 1px solid var(--color-trans);
		transition: border-left 0.25s ease-out;

		&__dropdown-icon {
			margin-left: auto;
		}
	}

	.wrapper {
		position: relative;
		transition: border-left 0.25s ease-out;
		border-left: 4px solid transparent;

		&__link {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
		}

		&:not(.isDropdownOpen):hover {
			border-left: 4px solid var(--color-midnight);
			cursor: pointer;
		}
	}

	span,
	a {
		font-size: var(--text-base-lg);
	}

	.dropdown {
		display: flex;
		flex-direction: column;
		padding-left: var(--space-xl);
		gap: var(--space-xs);
		padding-bottom: var(--space-sm);

		&__link {
			transition: border-left 0.25s ease-out;
			border-left: 4px solid transparent;
		}

		&__link:hover {
			border-left: 4px solid var(--color-midnight);
		}
	}
</style>
