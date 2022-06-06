<script lang="ts">
	import Hr from '$lib/components/global/HR.svelte';
	import TextArea from '$lib/components/input/TextArea.svelte';
	import FormWrapper from '../../FormWrapper.svelte';
	import InputWrapper from '../../InputWrapper.svelte';
	
	export let title: string = 'Listing description';

	interface DataInputs {
		description?: string;
		space?: string;
	}

	export let inputs: DataInputs = {
		description: '',
		space: ''
	};

	let inputsClone = { ...inputs };

	const updateData = (data: DataInputs) => {
		console.log('Updating data to', data.description, data.space);
		inputs = { ...inputsClone };
	};

	const handleCancel = () => {
		inputsClone = { ...inputs };
	};

	const handleSaveEvent = () => {
		updateData(inputsClone);
	};
</script>

<FormWrapper {title} value={inputs.description} on:save={handleSaveEvent} on:cancel={handleCancel}>
	<div class="inputs" slot="input">
		<InputWrapper
			{title}
			description="Give guests a sense of what it's like to stay at your place, including why they'll love staying there."
		>
			<TextArea bind:value={inputsClone.description} />
			<!-- <TextInput name="" bind:value={inputsClone.description} /> -->
		</InputWrapper>

		<Hr />

		<InputWrapper
			title="The space"
			description="Provide a general description of what the property and rooms are like so guests know what to expect."
		>
			<TextArea bind:value={inputsClone.space} />
			<!-- <TextInput name="" bind:value={inputsClone.space} /> -->
		</InputWrapper>
	</div>
</FormWrapper>

<style lang="scss">
	.inputs {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}
</style>
