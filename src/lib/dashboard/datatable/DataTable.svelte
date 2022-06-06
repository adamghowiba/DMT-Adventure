<script lang="ts">
	import { range } from '$lib/helpers/number-helper';
	import type { DataTableCol } from '$lib/types/table';
	import { createEventDispatcher } from 'svelte';
	import Table from '../table/Table.svelte';
	import TableBody from '../table/TableBody.svelte';
	import TableCell from '../table/TableCell.svelte';
	import TableFooter from '../table/TableFooter.svelte';
	import TableHeader from '../table/TableHeader.svelte';
	import TableRow from '../table/TableRow.svelte';

	export let expandable: boolean = false;
	export let selectable: boolean = false;
	export let disableSelectionOnClick: boolean = true;
	export let columns: DataTableCol[] = [];
	export let rows: { [key: string]: any }[] = [];

	export let shiftable: boolean = true;

	let selectedRows: number[] = [];
	let page = 0;
	let rowsPerPage: number;

	let lastSelectedRow: number;
	let shiftKeyHeld: boolean = false;

	const dispatch = createEventDispatcher();

	const fillRow = (start: number, end: number) => {
		const rangeArray = range(start, end);

		rangeArray.forEach((num) => {
			const numIndex = selectedRows.indexOf(num);

			if (numIndex > -1) {
				selectedRows = selectedRows.filter((rowIndex) => rowIndex !== num);
				// console.log(`Row at ${numIndex} already exists`)
			} else {
				selectedRows = [...selectedRows, num];
			}
		});
		// selectedRows = [...selectedRows, ...range(lastSelectedRow, rowIndex)];
		// console.debug('Mass selecting rows', range(lastSelectedRow, rowIndex));
		// console.debug('Rows Selected', selectedRows);
	};

	/**
	 * Logic for selecting a row.
	 * @param rowIndex
	 */
	const selectRow = (rowIndex: number) => {
		if (selectedRows.length && selectedRows.indexOf(rowIndex) > -1) {
			selectedRows = selectedRows.filter((row) => row !== rowIndex);
			return;
		}

		if (shiftable && lastSelectedRow != null && shiftKeyHeld) {
			// selectedRows = [...selectedRows, ...range(lastSelectedRow, rowIndex)];
			fillRow(lastSelectedRow, rowIndex);
			console.debug('Mass selecting rows', range(lastSelectedRow, rowIndex));
		}

		lastSelectedRow = rowIndex;
		selectedRows = [...selectedRows, rowIndex];
	};

	/**
	 * Handle header input click
	 */
	function handleClickRowsHeader() {
		if (selectedRows.length) return (selectedRows = []);
		selectedRows = Array.from({ length: rows.length }, (_, i) => i);
	}

	/**
	 * Handle selectable input click.
	 * @param event
	 */
	function handleClickInput(event: MouseEvent) {
		event.stopPropagation();

		const target = event.target as HTMLElement;
		if (!target.dataset.row) return;

		const rowIndex = parseInt(target.dataset.row, 10);

		selectRow(rowIndex);
	}

	/**
	 * Handle table row click
	 * @param index - Index of data at the row being clicked.
	 */
	const handleRowClick = (index: number) => {
		if (disableSelectionOnClick) return;

		dispatch('rowClick', { index, selectedRows });

		selectRow(index);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (!shiftable || shiftKeyHeld) return;
		shiftKeyHeld = event.shiftKey;
	};

	const handleKeyUp = (event: KeyboardEvent) => {
		if (!shiftable) return;
		shiftKeyHeld = event.shiftKey;
	};

	const formatData = () => {
		const columnData = rows.map((data) => {
			return columns.reduce((acc: any, curr) => {
				if (data[curr.feild]) acc[curr.feild] = data[curr.feild];
				return acc;
			}, {});
		});

		console.log(columnData);
		return columnData;
	};

	$: rows = formatData();
	$: rowStart = page * rowsPerPage;
	$: rowEnd = (page + 1) * rowsPerPage;
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

<div class="table-wrapper">
	<Table>
		<TableHeader>
			<TableRow padding="10px 10px" hoverable={false}>
				{#if selectable}
					<TableCell width="0px">
						<input
							type="checkbox"
							checked={Boolean(selectedRows.length)}
							on:click={handleClickRowsHeader}
						/>
					</TableCell>
				{/if}
				{#if expandable}
					<TableCell />
				{/if}
				{#each columns as col}
					<TableCell>{col.headerName}</TableCell>
				{/each}
			</TableRow>
		</TableHeader>

		<TableBody>
			{#each rows.slice(rowStart, rowEnd) as row, i}
				{@const realtiveIndex = i + rowsPerPage * page}
				{@const isSelected = selectedRows.indexOf(realtiveIndex) > -1}

				<TableRow
					padding="15px 10px"
					highlighted={isSelected}
					on:click={() => handleRowClick(realtiveIndex)}
				>
					{#if selectable}
						<TableCell>
							<input
								data-row={realtiveIndex}
								type="checkbox"
								checked={isSelected}
								on:click={handleClickInput}
							/>
						</TableCell>
					{/if}

					<!-- Tabel Data  -->
					{#each Object.values(row) as data, j}
						<TableCell>
							{#if data instanceof Object}
								<a href={data.href}>
									{data.name}
								</a>
							{:else}
								<span class="cell">
									{data}
								</span>
							{/if}
						</TableCell>
					{/each}
				</TableRow>
			{/each}
		</TableBody>
	</Table>
	<TableFooter bind:rowsPerPage bind:page rowSize={rows.length} />
</div>

<style lang="scss">
	input {
		width: 17px;
		margin: 0;
		height: 17px;
		position: relative;
		top: 3px;
	}
	.cell {
		display: flex;
		align-items: center;
		position: relative;
		top: -1px;
	}
	.table-wrapper {
		width: 100%;
	}
</style>
