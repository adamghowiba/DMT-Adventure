<script lang="ts">
	import TextInput from '../input/TextInput.svelte';
	import BookWrapper from './BookWrapper.svelte';
</script>

<BookWrapper title="Pay with" gap="var(--space-md)">
	<div class="card">
		<TextInput focusStyle="inner" name="card" placeholder="Card number" />
		<div class="col">
			<TextInput focusStyle="inner" name="exp" placeholder="Experation" />
			<TextInput focusStyle="inner" name="cvv" placeholder="CVV" />
		</div>
	</div>

	<div class="billing">
		<h4>Billing Address</h4>
		<TextInput focusStyle="inner" name="street" placeholder="Street address" />
		<TextInput focusStyle="inner" name="street" placeholder="Apt or suite number" />
		<TextInput focusStyle="inner" name="street" placeholder="City" />
		<TextInput focusStyle="inner" name="street" placeholder="State" />
		<TextInput focusStyle="inner" name="street" placeholder="ZIP Code" />
	</div>
</BookWrapper>

<style lang="scss">
	.card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.col {
		display: flex;
		gap: var(--space-xs);
	}
	.billing {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
</style>
