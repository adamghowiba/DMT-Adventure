<script lang="ts">
	import { searchStore } from '$lib/stores/search-store';
	import Button from '../global/Button.svelte';
	import TextInput from '../input/TextInput.svelte';
	import DateDropdown from './DateDropdown.svelte';

	let isDatePickerOpen: boolean = false;

	const handleDateFocus = (event: Event) => {
		isDatePickerOpen = true;
		console.log('Focused');
	};

	function clickOutside(node: HTMLElement, handler: () => void): { destroy: () => void } {
		const onClick = (event: MouseEvent) =>
			node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented && handler();

		document.addEventListener('click', onClick, true);

		return {
			destroy() {
				document.removeEventListener('click', onClick, true);
			}
		};
	}

	const handleClickOutside = () => {
		isDatePickerOpen = false;
	};

	$: startDate = $searchStore.startDate
		? `${$searchStore.startDate?.month}/${$searchStore.startDate?.day}`
		: '';

	$: endDate = $searchStore.endDate
		? `${$searchStore.endDate?.month}/${$searchStore.endDate?.day}`
		: '';
</script>

<div class="bar">
	<TextInput name="place" placeholder="Where you visit" borderRadius="0px" focusStyle="inner" />
	<div class="dates" use:clickOutside={handleClickOutside}>
		<TextInput
			type="text"
			name="place"
			placeholder="Start Date"
			disabled
			value={startDate}
			borderRadius="0px"
			focusStyle="inner"
			on:click={handleDateFocus}
		/>
		<TextInput
			type="text"
			name="place"
			placeholder="End date"
			disabled
			on:click={handleDateFocus}
			value={endDate}
			focusStyle="inner"
			borderRadius="0px"
		/>
		{#if isDatePickerOpen}
			<div class="dropdown dropdown--date">
				<DateDropdown />
			</div>
		{/if}
	</div>
	<Button height="100%" borderRadius="square" href="/search">Search</Button>
</div>

<style lang="scss">
	.bar {
		position: relative;
		display: flex;
		background-color: var(--color-white);
		border-radius: var(--br-lg);
		width: 100%;
		max-width: 800px;
		border: 1px solid var(--color-primary);
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

		&--date {
			left: 0;
		}
	}
</style>
