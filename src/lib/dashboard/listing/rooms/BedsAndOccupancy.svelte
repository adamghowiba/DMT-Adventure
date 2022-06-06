<script lang="ts">
	import Button from '$lib/components/global/Button.svelte';
	import Select from '$lib/components/input/Select.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';
	import type { Beds, BedType } from '$lib/types/listing';
	import Icon from '@iconify/svelte';
	import RoomWrapper from './RoomWrapper.svelte';

	export let beds: Beds[] = [{ type: 'twin', count: 1 }];

	const bedItems: { name: string; value: BedType }[] = [
		{ name: 'Twin/Single Bed', value: 'twin' },
		{ name: 'Full Bed', value: 'full' },
		{ name: 'King bed', value: 'king' },
		{ name: 'Queen bed', value: 'queen' }
	];

	const addBedType = () => {
		beds = [...beds, { type: 'twin', count: 1 }];
	};

	const removeBedType = (index: number) => {
		beds.splice(index, 1);
		beds = beds;
	};
</script>

<RoomWrapper>
	<div class="wrapper">
		<header>
			<h3>Beds and occupancy</h3>
			<p>Assign number of beds and their type.</p>
		</header>

		<div class="beds">
			{#each beds as _, i}
				<div class="bed">
					<Select placeholder="Bed Type" items={bedItems} bind:value={beds[i].type} />

					<TextInput type="number" name="quantity" placeholder="QTY" bind:value={beds[i].count} />
					<div class="bed__icon" on:click={() => removeBedType(i)}>
						<Icon icon="gg:close-o" color="var(--color-red)" width={35} height={35} />
					</div>
				</div>
			{/each}
			<Button style="border" size="small" on:click={addBedType}>Add Bed Type</Button>
		</div>
	</div>
</RoomWrapper>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.beds {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.bed {
		display: grid;
		grid-template-columns: 1fr minmax(100px, 0.2fr) auto;
		align-content: center;
		align-items: center;
		gap: var(--space-2xs);
	}
</style>
