import type { SearchDate } from '$lib/types/Date';

export const THIS_YEAR = +new Date().getFullYear();
export const THIS_MONTH = +new Date().getMonth() + 1;

export const CALENDAR_WEEKS = 6;

export const zeroPad = (value: number, length: number) => {
	return `${value}`.padStart(length, '0');
};

export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
	// Months that only have 30 days.
	const months30 = [4, 6, 9, 11];

	const leapYear = year % 4 === 0;
	return month === 2 ? (leapYear ? 29 : 28) : months30.includes(month) ? 30 : 31;
};

export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
	return +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1;
};

export const getPreviousMonth = (month: number, year: number) => {
	const prevMonth = month > 1 ? month - 1 : 12;
	const prevMonthYear = month > 1 ? year : year - 1;
	return { month: prevMonth, year: prevMonthYear };
};

export const getNextMonth = (month: number, year: number) => {
	const nextMonth = month < 12 ? month + 1 : 1;
	const nextMonthYear = month < 12 ? year : year + 1;
	return { month: nextMonth, year: nextMonthYear };
};

export const getMonthName = (month: number) => {
	return monthMap.get(month);
};

export const parseSearchDate = (searchDate: SearchDate) => {
	const { month, day, year } = searchDate;
	return new Date(`${month}/${day}/${year}`);
};

export const dateIsBefore = (currentDate: Date, date: Date) => {
	return currentDate < date;
};

export const transformTripDates = (checkIn: Date, checkOut: Date) => {
	if (isNaN(checkIn.getDate()) || isNaN(checkOut.getDate())) return;

	const checkInMonth = getMonthName(checkIn.getMonth() + 1);
	const checkOutMonth = getMonthName(checkOut.getMonth() + 1);
	const formattedCheckOutMonth = checkInMonth === checkOutMonth ? '' : checkOutMonth;

	const checkInDay = checkIn.getDate();
	const checkOutDay = checkOut.getDate();

	console.log(checkInDay, checkOutDay);

	return `${checkInMonth} ${checkInDay} - ${formattedCheckOutMonth} ${checkOutDay}`;
};

export const getShortenDate = (date: Date): string => {
	if (isNaN(new Date(date).getDate())) return date.toString();
	const current = new Date();
	const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
	if (date.getFullYear() !== current.getFullYear()) dateOptions['year'] = '2-digit';

	const shortend = date.toLocaleDateString('en-us', dateOptions);

	return shortend;
};

export const daysMap = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wenesday',
	'Thursday',
	'Friday',
	'Saturday'
];

const monthMap = new Map<number, string>();
monthMap.set(1, 'January');
monthMap.set(2, 'Febuary');
monthMap.set(3, 'March');
monthMap.set(4, 'April');
monthMap.set(5, 'May');
monthMap.set(6, 'June');
monthMap.set(7, 'July');
monthMap.set(8, 'Augest');
monthMap.set(9, 'September');
monthMap.set(10, 'November');
monthMap.set(11, 'October');
monthMap.set(12, 'December');
