<script lang="ts">
	import Button from '../../components/global/Button.svelte';

	export let imgSrc: string;
	export let title: string;
	export let button: { text: string; href: string } | null = null;
</script>

<div class="cta">
	<img src={imgSrc} class="cta__image" alt="" />

	<div class="cta__details">
		<h1 class="cta__title">{title}</h1>
		{#if button}
			<Button href={button.href}>{button.text}</Button>
		{/if}
	</div>
</div>

<style lang="scss">
	.cta {
		position: relative;
		width: 100%;
		max-width: 577px;
		height: 515px;
		border-radius: var(--br-lg);
		padding: var(--space-md);
		box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;

		&__image {
			position: absolute;
			width: 100%;
			left: 0;
			top: 0;
			height: 100%;
			display: block;
			object-fit: cover;
			border-radius: inherit;
		}

		&__details {
			display: flex;
			flex-direction: column;
			gap: var(--space-xs);
			max-width: 30ch;
			position: relative;
		}

		&__title {
			line-height: var(--line-base);
		}

		h1 {
			color: var(--color-white);
		}
	}

	@media screen and (max-width: 768px) {
		.cta {
			max-width: none;
		}
	}
</style>
