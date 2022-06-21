<script lang="ts">
	export let name: string;
	export let checked: boolean = false;
</script>

<div class="checkbox">
	<input bind:checked type="checkbox" class="checkbox__input"  />
	<span>{name}</span>
</div>

<style lang="scss">
	.checkbox {
		width: 100%;
		display: flex;
        gap: var(--space-2xs);
		align-items: center;
		min-height: var(--space-4xl);
		background-color: var(--color-offwhite);
        padding: var(--space-xs);

        &__input {
            width:  16px;
            height: 16px;
        }

        span {
            font-size: var(--text-h5);
            text-transform: capitalize;
        }
    }
</style>
