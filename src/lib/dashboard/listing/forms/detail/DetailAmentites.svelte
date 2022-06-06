<script lang="ts">
	import Checkbox from '$lib/components/input/Checkbox.svelte';
	import FormWrapper from '../../FormWrapper.svelte';
	import InputWrapper from '../../InputWrapper.svelte';

	interface Amentites {
		[amen: string]: boolean;
	}

	export let amentities: Amentites = {
		hot_tub: true,
		resturant: true,
		pool: true,
		wifi: true,
		smoke_alarm: true,
		washer: true,
		bar: true
	};

	let amentitiesClone = { ...amentities };

	const handleCancel = () => {
		amentitiesClone = { ...amentities };
	};

	const handleSaveEvent = () => {
		updateData(amentitiesClone);
	};

	const updateData = (data: Amentites) => {
		amentities = { ...data };
	};
</script>

<FormWrapper on:save={handleSaveEvent} on:cancel={handleCancel}>
	<div class="amenities" slot="value">
		{#each Object.entries(amentities) as [key, value]}
			{#if value}
				<span class="amenities__amenity">{key.replace('_', ' ')}</span>
			{/if}
		{/each}
	</div>

	<div class="inputs" slot="input">
		<InputWrapper
			title="Property amentities"
			description="These are amenities that guests typically look for in a stay."
		>
			{#each Object.entries(amentities) as [key]}
				<Checkbox label={key.replace('_', ' ')} name={key} bind:checked={amentitiesClone[key]} />
			{/each}
		</InputWrapper>
	</div>
</FormWrapper>

<style lang="scss">
	.amenities {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);

		&__amenity {
			text-transform: capitalize;
			color: var(--color-gray-muted);
		}
	}
	.inputs {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}
</style>
