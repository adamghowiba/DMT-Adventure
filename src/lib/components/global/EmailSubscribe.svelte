<script lang="ts">
	import TextInput from '../input/TextInput.svelte';
	import Button from './Button.svelte';

	let value: string;
</script>

<section>
	<h1>Keep in touch</h1>

	<form action="">
		<TextInput width="100%" name="email" placeholder="email" focusStyle="inner" bind:value />
		<Button height="100%">Submit</Button>
	</form>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
		width: 100%;
		max-width: 600px;
		padding: 0 var(--space-sm);
	}

	form {
		width: 100%;
		display: flex;
		gap: var(--space-xs);
	}
</style>
