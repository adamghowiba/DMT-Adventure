<script lang="ts">
	import DatePicker from '$lib/components/searchbar/DatePicker.svelte';
	import {
		dateIsBefore,
		getNextMonth,
		getPreviousMonth,
		THIS_MONTH,
		THIS_YEAR
	} from '$lib/helpers/date-helper';
	import { createEventDispatcher } from 'svelte';

	let currentMonth: number = THIS_MONTH;
	let currentYear: number = THIS_YEAR;

	export let startDate: Date | undefined;
	export let endDate: Date | undefined;

	$: nextMonth = getNextMonth(currentMonth, THIS_YEAR).month;

	const dispatch = createEventDispatcher();

	const handleDateClick = ({ detail: date }: { detail: Date }) => {
		if (startDate && dateIsBefore(date, startDate)) {
			startDate = date;
			endDate = undefined;
			return;
		}

		if (startDate) {
			endDate = date;
			return;
		}

		startDate = date;
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
			{startDate}
			{endDate}
			on:clickPrevious={handlePreviousCalendarClick}
			on:clickDate={handleDateClick}
		/>
		<DatePicker
			pickerType="end"
			currentMonth={nextMonth}
			currentYear={(currentMonth == 12 ? currentYear + 1 : currentYear)}
			{startDate}
			{endDate}
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
		position: relative;
		z-index: 100;
	}
</style>
