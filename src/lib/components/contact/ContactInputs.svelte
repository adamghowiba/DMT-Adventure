<script lang="ts">
	import Button from '../global/Button.svelte';
	import Select from '../input/Select.svelte';
	import TextArea from '../input/TextArea.svelte';
	import TextDropdown from '../input/TextDropdown.svelte';
	import TextInput from '../input/TextInput.svelte';

	export let altitudes: { name: string; value: string }[] = [
		{ name: '1,000 ft', value: '1,000' },
		{ name: '2,500 ft', value: '2,500' },
		{ name: '5,000 ft', value: '5,000' },
		{ name: '6,000 ft', value: '6,000' },
		{ name: '10,000+ ft', value: '10,000+' }
	];

	export let refference: { name: string; value: string }[] = [
		{ name: 'Facebook', value: 'facebook' },
		{ name: 'Google', value: 'google' },
		{ name: 'Instagram', value: 'Instagram' },
		{ name: 'Refferal', value: 'Refferal' }
	];
</script>

<form on:submit|preventDefault action="" class="section--sm">
	<h3>More About You</h3>

	<div class="col">
		<TextInput value="" name="first_name" placeholder="First Name" required />
		<TextInput value="" name="last_name" placeholder="Last Name" />
	</div>
	<div class="col">
		<TextInput value="" name="email" placeholder="Email" required />
		<TextInput value="" name="phone" placeholder="Phone" required />
	</div>
	<div class="col">
		<TextInput type="date" value="" name="email" placeholder="Trip start date" required />
		<TextInput type="date" value="" name="email" placeholder="Trip end date" required />
	</div>
	<div class="col">
		<Select items={altitudes} placeholder="Current altitude" />
		<Select items={refference} placeholder="How did you hear about us" />
	</div>

	<TextArea value="" name="message" placeholder="Tell us about your trip..." />
	<Button>Submit</Button>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;

		.col {
			display: flex;
		}

		&,
		.col {
			gap: var(--space-xs);
		}
	}
</style>
