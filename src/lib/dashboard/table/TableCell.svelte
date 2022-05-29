<script lang="ts">
	import { parseStyles, parseStylesVars } from '$lib/helpers/string-helper';
	import type { TableCellStyle } from '$lib/types/table';
	import { getContext } from 'svelte';

	const cellStyles = getContext<TableCellStyle>('cellStyles');

	export let width: string = 'auto';
	export let minWidth: string = '40px';
	export let pinned: boolean = false;
</script>

<td class:pinned style="{parseStylesVars({ width, minWidth })} {parseStyles({ ...cellStyles })}">
	<slot />
</td>

<style lang="scss">
	td {
		width: var(--width);
		min-width: var(--minWidth);

		&.pinned {
			position: sticky;
			left: 0;
			top: 0;
			justify-content: center;
			align-items: center;
			height: 100%;
			padding: 0 30px !important;
		}
	}
</style>
