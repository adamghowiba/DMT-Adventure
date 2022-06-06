<script lang="ts">
	import type { TableCellStyle } from '$lib/types/table';
	import { setContext } from 'svelte';

	export let padding: string = 'none';
	export let highlighted: boolean = false;
	export let hoverable: boolean = true;

	setContext<TableCellStyle>('cellStyles', { padding });
</script>

<tr class:highlighted class:hoverable on:click>
	<slot />
</tr>

<style lang="scss">
	tr {
		transition: background-color 0.15s linear;
		border-top: 1px solid var(--color-tran-light);
		position: relative;

		&.hoverable:hover {
			background-color: rgba(107, 107, 107, 0.045);
		}

		&.highlighted {
			background-color: rgba(161, 58, 209, 0.105);
		}

		&.highlighted:hover {
			// opacity: 0.9;
			background-color: rgba(161, 58, 209, 0.09);
		}
	}
</style>
