<script lang="ts">
	import { getMonthName } from '$lib/helpers/date-helper';
	import Button from '../global/Button.svelte';
	import BookWrapper from './BookWrapper.svelte';

	export let checkInDate: Date;
	export let checkOutDate: Date;
	export let guests: number;

	const transformTripDates = (checkIn: Date, checkOut: Date) => {
		if (isNaN(checkIn.getDate()) || isNaN(checkOut.getDate())) return;

		const checkInMonth = getMonthName(checkIn.getMonth() + 1);
		const checkOutMonth = getMonthName(checkOut.getMonth() + 1);
		const formattedCheckOutMonth = checkInMonth === checkOutMonth ? '' : checkOutMonth;
		const checkInDay = checkIn.getDay();
		const checkOutDay = checkOut.getDay();

		return `${checkInMonth} ${checkInDay} - ${formattedCheckOutMonth} ${checkOutDay}`;
	};
</script>

<BookWrapper title="Your trip" gap="var(--space-md)">
	<div class="detail">
		<div class="detail__info">
			<h4>Dates</h4>
			<span>{transformTripDates(checkInDate, checkOutDate)}</span>
		</div>

		<Button color="black" style="empty">Edit</Button>
	</div>

	<div class="detail">
		<div class="detail__info">
			<h4>Guests</h4>
			<span>{guests} guest</span>
		</div>

		<Button color="black" style="empty">Edit</Button>
	</div>
</BookWrapper>

<style lang="scss">
	.detail {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-md);

		&__info {
			display: flex;
			flex-direction: column;
			gap: var(--space-2xs);
		}
	}
</style>
