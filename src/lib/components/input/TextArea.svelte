<script lang="ts">
	import autoSizeTextarea from '$lib/actions/autoSizeTextarea';

	export let name = 'text';
	export let placeholder = '';
	export let value: string = '';
	export let rows: number = 3;
	export let cols: number = 7;
</script>

<div class="textarea-wrap">
	<textarea class="textarea" {name} {placeholder} {cols} {rows} bind:value use:autoSizeTextarea />
	<!-- {#if !value && placeholder}
		<div class="placeholder">{placeholder}</div>
	{/if} -->
</div>

<style lang="scss">
	.textarea {
		min-height: 130px;
		appearance: none;
		background-color: transparent;
		border: none;
		outline: none;
		padding: var(--space-xs);
		border-radius: var(--br-lg);
		font-size: var(--text-base-lg);
		color: var(--color-text-body);
		border: 1px solid var(--color-gray-light);
		width: 100%;
		font-family: inherit;
		resize: none;

		transition: border 0.085s ease-in-out;

		&:focus {
			border: 1px solid var(--color-primary);
			border-bottom-width: 2px;
		}

		&:focus + .placeholder {
			display: none;
		}
	}
	.textarea-wrap {
		position: relative;

		.placeholder {
			color: var(--color-gray-muted);
			position: absolute;
			top: var(--space-xs);
			left: var(--space-xs);
		}
	}
	@media screen and (max-width: 375px) {
		.textarea {
			font-size: 14px;
		}
	}
</style>
