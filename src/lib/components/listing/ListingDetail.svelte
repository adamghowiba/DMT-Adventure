<script lang="ts">
	export let title: string;
    export let border: boolean = true;
</script>

<div class="detail" class:border>
	<div class="detail__title">
		<h4>{title}</h4>
	</div>
	<div class="detail__content">
		<slot />
	</div>
</div>

<style lang="scss">
	.detail {
		display: flex;
		align-items: center;
		gap: var(--space-xl);
		padding: var(--space-md) 0;
        
        &.border {
            border-bottom: 1px solid var(--color-trans);
        }

		h4 {
			font-size: var(--text-h3);
			max-width: 20ch;
			font-weight: var(--fw-regular);
		}
        
        &__title {
            min-width: 300px;
        }
	}
</style>
