<script lang="ts">
	import Icon from '@iconify/svelte';

	export let name: string;
</script>

<div class="item" on:click>
	<Icon icon="entypo:location-pin" width={20} height={20} color="var(--color-primary)" />
	<span>{name}</span>
</div>

<style lang="scss">
	.item {
		padding: var(--space-xs) var(--space-xs);
		display: flex;
		align-items: center;
		gap: var(--space-2xs);
		transition: background-color 0.055s ease-in-out;
		span {
			text-transform: capitalize;
		}

		&:hover {
			background-color: var(--color-trans);
			cursor: pointer;
		}
	}
</style>
