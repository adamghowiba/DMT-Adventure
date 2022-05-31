<script lang="ts">
	export let label: string;
	export let name: string;
	export let checked: boolean = false;
</script>

<button class="input-wrap" on:click={() => (checked = !checked)}>
	<input {name} bind:checked type="checkbox" />
	{#if label}
		<label for={name}>{label}</label>
	{/if}
</button>

<style lang="scss">
	button {
		appearance: none;
		border: none;
		outline: none;
		background-color: transparent;
	}
	.input-wrap {
		display: flex;
		align-items: center;
		gap: var(--space-2xs);
	}
	input {
		width: 18px;
		height: 18px;
	}
	label {
		font-size: var(--text-base-lg);
		color: var(--color-text-body);
		text-transform: capitalize;
	}
</style>
