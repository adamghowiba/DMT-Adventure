<script lang="ts">
	import TextInput from '$lib/components/input/TextInput.svelte';
	import FormWrapper from '../../FormWrapper.svelte';
	import InputWrapper from '../../InputWrapper.svelte';

	export let value: string;
</script>

<FormWrapper title="listing title" {value}>
	<InputWrapper
		slot="input"
		title="Listing title"
		description="Your listing title should highlight what makes your place special"
	>
		<TextInput name="" {value} />
	</InputWrapper>
</FormWrapper>

<style lang="scss">
</style>
