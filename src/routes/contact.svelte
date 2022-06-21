<script lang="ts">
	import ContactCheckbox from '$lib/components/contact/ContactCheckbox.svelte';
	import ContactInputs from '$lib/components/contact/ContactInputs.svelte';
	import ContactSelect from '$lib/components/contact/ContactSelect.svelte';
import TextInput from '$lib/components/input/TextInput.svelte';
	import DateDropdown from '$lib/components/searchbar/DateDropdown.svelte';
	import DatePicker from '$lib/components/searchbar/DatePicker.svelte';

    let startDate: Date | undefined;
    let endDate: Date | undefined;
</script>

<section class="container section--sm">
	<header>
		<h2>Have a personal tour guide plan your trip.</h2>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque est dicta aliquam a possimus
			cupiditate eum amet! Molestiae, quis quia.
		</p>
	</header>

	<ContactSelect />
<!-- 
	<section class="section--sm">
		<h3>Trip Date</h3>
		<div class="date-picker">
            <div class="date-picker__input">
                <TextInput name="" value="" placeholder="Start Date" readonly/>
                <DatePicker currentMonth={1} bind:startDate />
            </div>
            <div class="date-picker__input">
                <TextInput name="" value="" placeholder="Start Date" readonly/>
                <DatePicker currentMonth={1} bind:endDate />
            </div>
		</div>
	</section> -->

	<ContactInputs />
</section>

<style lang="scss">
    .date-picker {
        max-width: 300px;
    }
	header {
		margin: 0 auto;
		text-align: center;
		max-width: 70ch;
	}
</style>
