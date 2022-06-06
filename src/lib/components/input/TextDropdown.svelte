<script lang="ts">
	import TextInput from './TextInput.svelte';
	import { fade } from 'svelte/transition';
	import { clickOutside } from '$lib/actions/clickOutside';

	export let value: string;
	export let name: string;
	export let textTransform: 'capitalize' | 'uppercase' | 'none' = 'none';
	export let isDropdownOpen = false;
	export let borderColor: string = 'var(--color-gray-light)';
</script>

<div class="where" >
	<TextInput
		{name}
		placeholder="where"
		{textTransform}
		{borderColor}
		bind:value
		on:focus
		on:blur
		on:click={() => (isDropdownOpen = true)}
	/>

	{#if isDropdownOpen}
		<div class="dropdown" transition:fade={{ duration: 100 }}>
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	.where {
		position: relative;
		text-transform: uppercase;
	}
	.dropdown {
		position: absolute;
		z-index: 1000;
		width: 100%;
		background-color: white;
		bottom: 0;
		transform: translateY(104%);
		border-radius: var(--br-sm);
		box-shadow: var(--shadow-image);
	}
</style>
