<script lang="ts">
	import { buildCalendar } from '$lib/helpers/date-builder';
	import { daysMap, getMonthName, THIS_YEAR } from '$lib/helpers/date-helper';
	import { searchStore } from '$lib/stores/search-store';
	import type { SearchDate } from '$lib/types/Date';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let currentMonth: number;
	export let pickerType: 'start' | 'end';
	export let currentYear: number = THIS_YEAR;

	const dispatch = createEventDispatcher();

	const handleDayClick = (month: number, day: number, year: number) => {
		dispatch('clickDate', { month, day, year });
	};

	const parseSearchDate = (searchDate: SearchDate) => {
		const { month, day, year } = searchDate;
		return new Date(`${month}/${day}/${year}`);
	};

	const checkHighlighted = (date: SearchDate) => {
		if (!$searchStore.startDate || !$searchStore.endDate) return;

		return dateIsBetween(date);
	};

	const dateIsBetween = (date: SearchDate) => {
		if (!$searchStore.startDate || !$searchStore.endDate) return;

		const startDate = parseSearchDate($searchStore.startDate);
		const endDate = parseSearchDate($searchStore.endDate);
		const parsedDate = parseSearchDate(date);

		return parsedDate >= startDate && parsedDate <= endDate;
	};

	const isDateSelected = (date: SearchDate) => {
		const isStartDate =
			$searchStore.startDate?.day === date?.day &&
			$searchStore.startDate?.month === date?.month &&
			$searchStore.startDate.year === date.year;
			
		const isEndDate =
			$searchStore.endDate?.day === date?.day &&
			$searchStore.endDate.month === date?.month &&
			$searchStore.endDate.year === date.year;

		return isStartDate || isEndDate;
	};

	$: calendar = buildCalendar(currentMonth, currentYear);
</script>

<div class="picker">
	<header class="header">
		<div class="header__icon header__icon--left" on:click={() => dispatch('clickPrevious')}>
			{#if pickerType === 'start'}
				<Icon icon="ic:round-navigate-next" width={25} height={25} rotate={2} />
			{/if}
		</div>
		<span>
			{getMonthName(currentMonth)}
			{currentYear}
		</span>
		{#if pickerType === 'end'}
			<div class="header__icon header__icon--right" on:click={() => dispatch('clickNext')}>
				<Icon icon="ic:round-navigate-next" width={25} height={25} />
			</div>
		{/if}
	</header>

	<div class="picker__days">
		{#each daysMap as day}
			<span class="picker__days-item">{day.substring(0, 2)}</span>
		{/each}
	</div>

	<div class="day">
		{#key [$searchStore.startDate, $searchStore.endDate]}
			{#each calendar as [month, day, year], i (i)}
				{#if day === -1}
					<div class="day__blank" />
				{:else}
					<div
						class="day__item"
						class:highlighted={checkHighlighted({ month, day, year })}
						class:selected={isDateSelected({ month, day, year })}
						on:click={() => handleDayClick(month, day, year)}
					>
						{day}
					</div>
				{/if}
			{/each}
		{/key}
	</div>
</div>

<style lang="scss">
	.day {
		display: grid;
		grid-template-columns: repeat(7, auto);
		grid-template-rows: repeat(5, auto);
		flex-wrap: wrap;
		row-gap: 1px;
		color: var(--color-midnight);
		justify-content: space-between;

		&__item {
			border: 1px solid transparent;
			border-radius: 50%;
		}

		&__item.highlighted {
			border-radius: 2px;
			background-color: rgba(119, 119, 119, 0.062);
		}

		&__item.selected {
			border-radius: 50%;
			background-color: var(--color-midnight);
			color: var(--color-white);
		}

		&__item:hover {
			border-color: var(--color-midnight);
			cursor: pointer;
		}
	}

	.day__item,
	.picker__days-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 45px;
		height: 45px;
	}

	.header {
		padding: var(--space-xs);
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;

		&__icon {
			position: absolute;
		}

		&__icon--right {
			right: var(--space-xs);
		}

		&__icon--left {
			left: var(--space-xs);
		}
	}

	.picker {
		color: var(--color-text-heading);
		height: 100%;

		&__days {
			width: 100%;
			display: flex;
			justify-content: space-between;
		}

		&__days-item {
		}
	}
</style>
