<script lang="ts">
	import Icon from '@iconify/svelte';

	export let title: string;
	export let desc: string;
	export let icon: string;
    export let iconRotate: number = 0;
</script>

<div class="highlight">
	<Icon {icon} width={20} height={20} rotate={iconRotate} color="var(--color-text-body)" />

	<div class="highlight__info">
		<h5>{title}</h5>
		<p>{desc}</p>
	</div>
</div>

<style lang="scss">
    .highlight {
        display: flex;
        gap: var(--space-2xs);
    }
</style>
