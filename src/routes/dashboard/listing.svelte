<script lang="ts">
	import TextInput from '$lib/components/input/TextInput.svelte';
	import DataTable from '$lib/dashboard/datatable/DataTable.svelte';
	import type { DataTableCol } from '$lib/types/table';

	export let searchValue: string = '';

	const COLUMNS: DataTableCol[] = [
		{
			headerName: 'Listing',
			type: 'string',
			feild: 'listing'
		},
		{
			headerName: 'status',
			type: 'string',
			feild: 'status'
		},
		{
			headerName: 'rooms',
			type: 'string',
			feild: 'rooms'
		},
		{
			headerName: 'location',
			type: 'string',
			feild: 'location'
		}
	];

	const ROWS = [
		{
			listing: { href: '/dashboard/listing/1231241', name: 'Hilton grand hotel & suites' },
			status: 'In progress',
			rooms: 1,
			location: 'Marco island naples'
		},
		{
            listing: { href: '/dashboard/listing/1231241', name: 'Grand Vista Hotel' },
			status: 'In progress',
			rooms: 1,
			location: 'Marco island naples'
		},
		{
            listing: { href: '/dashboard/listing/1231241', name: 'Trekking through Naples' },
			status: 'In progress',
			rooms: 1,
			location: 'Marco island naples'
		}
	];

	$: filteredRows = searchValue
		? ROWS.filter((row) => row.listing.name.toLowerCase().includes(searchValue.toLowerCase()))
		: ROWS;
</script>

<section>
	<header>
		<h2>{filteredRows.length} Listing</h2>
		<div class="table-header">
			<input class="data-search" type="text" placeholder="search" bind:value={searchValue} />
		</div>
	</header>
	<DataTable columns={COLUMNS} rows={filteredRows} selectable />
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.data-search {
		appearance: none;
		border: none;
		outline: none;
		background-color: transparent;
		border: 1px solid var(--color-gray-light);
		padding: var(--space-2xs);
	}
	.data-search::placeholder {
		text-transform: capitalize;
		color: var(--color-gray-muted);
	}
</style>
