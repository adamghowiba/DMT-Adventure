<script lang="ts">
	export let thumbnail: string;
	export let title: string;
	export let subtitle: string | null = null;
</script>

<header class="header">
	<img src={thumbnail} alt="" />

	<div class="details">
		{#if subtitle}
			<span class="details__subtitle">{subtitle}</span>
		{/if}
		<p class="details__title">{title}</p>
	</div>
</header>

<style lang="scss">
	.header {
		display: flex;
		gap: var(--space-xs);

		img {
			width: 100%;
			object-fit: cover;
			max-width: 124px;
			height: 106px;
			border-radius: 7px;
		}
	}

	.details {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);

		&__subtitle {
			font-size: var(--text-h6);
			color: var(--color-gray-muted);
		}

		&__title {
			line-height: 1em;
		}
	}
</style>
