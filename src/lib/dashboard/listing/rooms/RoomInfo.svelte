<script lang="ts">
	import Select from '$lib/components/input/Select.svelte';
	import TextArea from '$lib/components/input/TextArea.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';
	import type { Room,RoomType } from '$lib/types/listing';
	import RoomWrapper from './RoomWrapper.svelte';
	
	export let roomInfo: Partial<Pick<Room, 'roomType' | 'stock' | 'name'>>;

	const roomItems: { name: string; value: RoomType }[] = [
		{
			name: 'Suite',
			value: 'suite'
		},
		{
			name: 'Single',
			value: 'single'
		},
		{
			name: 'Double',
			value: 'suite'
		},
		{
			name: 'Penthouse',
			value: 'penthouse'
		},
		{
			name: 'Triple',
			value: 'triple'
		}
	];
</script>

<RoomWrapper>
	<div class="wrapper">
		<header>
			<h3>Basic Room information</h3>
			<p>Let guests know more about the room.</p>
		</header>

		<div class="form">
			<Select placeholder="Room Type" items={roomItems} bind:value={roomInfo.roomType} />
			<TextInput
				name="title"
				placeholder="Room name"
				type="text"
				required
				bind:value={roomInfo.name}
			/>
			<TextArea name="Decription" placeholder="Description" value="" />
			<TextInput
				name="Stock"
				placeholder="Stock"
				type="number"
				required
				bind:value={roomInfo.stock}
			/>

			<!-- <Hr /> -->
			<!-- TODO: Add Radio Options -->
		</div>
	</div>
</RoomWrapper>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.form {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
</style>
