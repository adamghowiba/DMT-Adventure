<script lang="ts">
	import CallToAction from './CTACard.svelte';
</script>

<div class="cta-wrap section container">
	<CallToAction
		imgSrc="/images/index/cave_explore.png"
		title="Things to do from home"
		button={{ href: '', text: 'Expierences' }}
	/>
	<CallToAction
		imgSrc="/images/index/online_expierence.png"
		title="Things to do on your trip"
		button={{ href: '', text: 'Online Expierences' }}
	/>
</div>

<style lang="scss">
	.cta-wrap {
		display: flex;
		gap: var(--space-xl);
	}

	@media screen and (max-width: 768px) {
		.cta-wrap {
			flex-direction: column;
			width: 100%;
		}
	}
</style>
