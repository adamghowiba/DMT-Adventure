<script lang="ts">
	import TextInput from '$lib/components/input/TextInput.svelte';
	import { PLACES } from '$lib/constants/places';
	import DataTable from '$lib/dashboard/datatable/DataTable.svelte';
	import type { Place } from '$lib/types/listing';
	import type { DataTableCol } from '$lib/types/table';

	export let searchValue: string = '';

	const transformListingData = (places: Place[]) => {
		return places.map(({ title, rooms, address, listingStatus, id }) => ({
			title: { href: `/dashboard/listing/${id}/details`, name: title },
			address: `${address?.state}, ${address?.city}`,
			status: listingStatus || 'not set',
			rooms: rooms.length,
		}));
	};

	const COLUMNS: DataTableCol[] = [
		{
			headerName: 'Listing',
			type: 'string',
			feild: 'title'
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
			feild: 'address'
		}
	];

	const ROWS = transformListingData(PLACES);

	$: filteredRows = searchValue
		? ROWS.filter((row) => row.title.name.toLowerCase().includes(searchValue.toLowerCase()))
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
