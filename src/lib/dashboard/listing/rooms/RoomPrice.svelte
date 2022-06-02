<script lang="ts">
	import TextInput from '$lib/components/input/TextInput.svelte';
	import type { Room } from '$lib/types/listing';
	import RoomWrapper from './RoomWrapper.svelte';

	export let roomPrice: number | undefined;
</script>

<RoomWrapper>
	<div class="wrapper">
		<header>
			<h3>Pricing</h3>
		</header>

		<div class="form">
			<TextInput name="price" placeholder="price" type="number" required bind:value={roomPrice} />
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
