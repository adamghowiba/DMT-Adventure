<script lang="ts">
	import {
		dateIsBefore,
		getNextMonth,
		getPreviousMonth,
		THIS_MONTH,
		THIS_YEAR
	} from '$lib/helpers/date-helper';
	import { searchStore } from '$lib/stores/search-store';
	import type { SearchDate } from '$lib/types/Date';
	import DatePicker from '$lib/components/searchbar/DatePicker.svelte';

	let currentMonth: number = THIS_MONTH;
	let currentYear: number = THIS_YEAR;

	$: nextMonth = getNextMonth(currentMonth, THIS_YEAR).month;

	const handleDateClick = ({ detail: date }: { detail: SearchDate }) => {
		if ($searchStore.startDate && dateIsBefore(date, $searchStore.startDate)) {
			searchStore.setStartDate(date);
			$searchStore.endDate = undefined;
			console.log('Clickecd before');
			return;
		}

		if ($searchStore.startDate) {
			searchStore.setEndDate(date);
			return;
		}

		searchStore.setStartDate(date);
	};

	const handlePreviousCalendarClick = () => {
		const previousMonth = getPreviousMonth(currentMonth, currentYear);
		currentYear = previousMonth.year;
		currentMonth = previousMonth.month;
	};

	const handleNextCalendarClick = () => {
		const nextMonth = getNextMonth(currentMonth, currentYear);
		currentYear = nextMonth.year;
		currentMonth = nextMonth.month;
	};
</script>

<div class="search">
	<div class="date">
		<DatePicker
			pickerType="start"
			{currentMonth}
			{currentYear}
			on:clickPrevious={handlePreviousCalendarClick}
			on:clickDate={handleDateClick}
		/>
		<DatePicker
			pickerType="end"
			currentMonth={nextMonth}
			{currentYear}
			on:clickNext={handleNextCalendarClick}
			on:clickDate={handleDateClick}
		/>
	</div>
</div>

<style lang="scss">
	.search {
		position: relative;
		display: flex;
		background-color: white;
		padding: var(--space-lg) var(--space-lg);
		border-radius: var(--br-lg);
		overflow-y: auto;
		width: 100%;
	}
	.date {
		gap: var(--space-lg);
		display: flex;
		height: 330px;
	}

	h3 {
		color: var(--color-white);
	}
</style>
