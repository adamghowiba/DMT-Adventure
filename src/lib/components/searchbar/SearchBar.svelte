<script lang="ts">
	import { clickOutside } from '$lib/actions/clickOutside';
	import { NEPAL_CITIES } from '$lib/constants/cities';
	import { getShortenDate } from '$lib/helpers/date-helper';
	import { getSearchListingQuery } from '$lib/helpers/query-helper';
	import { searchStore } from '$lib/stores/search-store';
	import Button from '../global/Button.svelte';
	import TextDropdown from '../input/TextDropdown.svelte';
	import TextInput from '../input/TextInput.svelte';
	import DateDropdown from './DateDropdown.svelte';
	import LocationItem from './LocationItem.svelte';

	export let searchButton: boolean = false;
	export let locationValue: string = NEPAL_CITIES[0].name;

	export let startDate: Date | undefined = undefined;
	export let endDate: Date | undefined = undefined;

	$: shortenedCheckIn = startDate ? getShortenDate(startDate) : 'Any';
	$: shortenedCheckOut = endDate ? getShortenDate(endDate) : 'Any';

	let isDatePickerOpen: boolean = false;
	let isWhereDropdownOpen = false;

	const handleDateFocus = (event: Event) => {
		isDatePickerOpen = true;
	};

	const handleClickOutside = () => {
		isDatePickerOpen = false;
	};

	const handleWhereFocus = () => {
		if (locationValue === NEPAL_CITIES[0].name) {
			locationValue = '';
		}
	};

	const handleWhereBlur = () => {
		if (!isWhereDropdownOpen) return;
		isWhereDropdownOpen = false;
		if (!locationValue) return (locationValue = NEPAL_CITIES[0].name);
	};

	const handleLocationClick = (where: string) => {
		locationValue = where;
		isWhereDropdownOpen = false;
	};

	$: filteredCities = locationValue
		? NEPAL_CITIES.filter((city) => city.name.toLowerCase().includes(locationValue.toLowerCase()))
		: NEPAL_CITIES;
</script>

<div class="bar">
	<div class="bar__place" use:clickOutside={handleWhereBlur}>
		<TextDropdown
			name="where"
			textTransform="capitalize"
			borderColor="var(--color-primary)"
			bind:isDropdownOpen={isWhereDropdownOpen}
			bind:value={locationValue}
			on:focus={handleWhereFocus}
		>
			{#each filteredCities as city}
				<LocationItem name={city.name} on:click={() => handleLocationClick(city.name)} />
			{/each}
		</TextDropdown>
	</div>
	<div class="dates" use:clickOutside={handleClickOutside}>
		<TextInput
			type="text"
			name="place"
			placeholder="Start Date"
			disabled
			bind:value={shortenedCheckIn}
			borderRadius="7px 0px 0px 7px"
			focusStyle="inner"
			borderColor="var(--color-primary)"
			on:click={handleDateFocus}
		/>
		<TextInput
			type="text"
			name="place"
			placeholder="End date"
			disabled
			bind:value={shortenedCheckOut}
			focusStyle="inner"
			borderColor="var(--color-primary)"
			borderRadius="0px 7px 7px 0px"
			on:click={handleDateFocus}
		/>

		<!-- Date Dropdown -->
		{#if isDatePickerOpen}
			<div class="dropdown dropdown--date">
				<DateDropdown bind:startDate bind:endDate />
			</div>
		{/if}
	</div>

	{#if searchButton}
		<Button
			height="100%"
			width="100%"
			borderRadius="base"
			icon={{ icon: 'akar-icons:search', size: 23 }}
			href="/search?{getSearchListingQuery({ location: locationValue, checkIn: startDate, checkOut: endDate })}"
		/>
	{/if}
</div>

<style lang="scss">
	.bar {
		position: relative;
		display: grid;
		grid-template-columns: 1.3fr 1fr auto;
		// background-color: var(--color-white);
		width: 100%;
		gap: var(--space-sm);

		&__place {
			width: 100%;
		}
	}
	.dates {
		width: 100%;
		display: flex;
	}
	.dropdown {
		position: relative;
		z-index: 100;
		width: 100%;
		position: absolute;
		bottom: 0;
		transform: translateY(100%);
		z-index: 2000;

		&--date {
			left: 0;
		}
	}

	@media screen and (max-width: 768px) {
		.bar {
			grid-template-columns: 1fr auto;
			grid-template-rows: 1fr 1fr;
			gap: var(--space-2xs);
			padding: var(--space-2xs);

			&__place {
				grid-column: 1/-1;
			}
		}
		// .dates {
		// }
	}

	@media screen and (max-width: 425px) {
		.bar {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;

			&__place {
				grid-column: 1/-1;
			}
		}
	}
</style>
