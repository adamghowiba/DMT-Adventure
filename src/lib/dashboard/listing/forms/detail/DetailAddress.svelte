<script lang="ts">
	import Hr from '$lib/components/global/HR.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';
	import type { Address } from '$lib/types/listing';
	import FormWrapper from '../../FormWrapper.svelte';
	import InputWrapper from '../../InputWrapper.svelte';

	export let title: string = 'Address';

	export let address: Address = {
		street: '',
		city: '',
		state: '',
		zip: ''
	};

	let addressClone = { ...address };

	const handleCancel = () => {
		addressClone = { ...address };
	};

	const handleSaveEvent = () => {
		updateData(addressClone);
	};

    const updateData = (data: Address) => {
		address = { ...addressClone };
	};

	const formatAddress = (address: Address) => {
		if (!Object.values(address).every(Boolean)) return undefined;

		return `${address.street} ${address.city} ${address.state} ${address.zip}`;
	};
</script>

<FormWrapper
	{title}
	value={formatAddress(address)}
	on:save={handleSaveEvent}
	on:cancel={handleCancel}
>
	<div class="inputs" slot="input">
		<InputWrapper {title}>
			<TextInput name="street" placeholder="Street" bind:value={addressClone.street} />

			<div class="inputs__grid">
				<TextInput name="city" placeholder="City" bind:value={addressClone.city} />
				<TextInput name="state" placeholder="State" bind:value={addressClone.state} />
				<TextInput name="zip" placeholder="Zip" bind:value={addressClone.zip} />
			</div>
		</InputWrapper>
	</div>
</FormWrapper>

<style lang="scss">
	.inputs {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);

		&__grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			column-gap: var(--space-xs);
			row-gap: var(--space-md);
		}
	}
</style>
