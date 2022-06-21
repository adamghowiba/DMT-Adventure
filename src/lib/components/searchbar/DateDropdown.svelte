<script lang="ts">
	import DatePicker from '$lib/components/searchbar/DatePicker.svelte';
	import {
		dateIsBefore,
		getNextMonth,
		getPreviousMonth,
		THIS_MONTH,
		THIS_YEAR
	} from '$lib/helpers/date-helper';
	import Icon from '@iconify/svelte';
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
		console.log('Clicking next calendar');
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
		<!-- Date Header (Controls) -->
		<header class="header">
			<div class="header__icon header__icon--left" on:click={handlePreviousCalendarClick}>
				<Icon icon="ic:round-navigate-next" width={25} height={25} rotate={2} />
			</div>
			<div class="header__icon header__icon--right" on:click={handleNextCalendarClick}>
				<Icon icon="ic:round-navigate-next" width={25} height={25} />
			</div>
		</header>

		<DatePicker
			pickerType="start"
			{currentMonth}
			{currentYear}
			{startDate}
			{endDate}
			on:clickDate={handleDateClick}
		/>

		<div class="date__second">
			<DatePicker
				pickerType="end"
				currentMonth={nextMonth}
				currentYear={currentMonth == 12 ? currentYear + 1 : currentYear}
				{startDate}
				{endDate}
				on:clickDate={handleDateClick}
			/>
		</div>
	</div>
</div>

<style lang="scss">
	.search {
		position: relative;
		display: flex;
		justify-content: center;
		background-color: white;
		padding: var(--space-lg) var(--space-lg);
		border-radius: var(--br-lg);
		overflow-y: auto;
		width: 100%;
	}
	header {
		display: flex;
		justify-content: space-between;
		position: absolute;
		width: 100%;
		transform: translateY(36%);
		z-index: 10;
	}
	.date {
		gap: var(--space-lg);
		display: flex;
		height: 330px;
		position: relative;
		z-index: 100;
	}

	@media screen and (max-width: 860px) {
		.date {
			&__second {
				display: none;
			}
		}
	}

	@media screen and (max-width: 597px) {
		.search {
			padding: var(--space-sm);
		}
	}
</style>
