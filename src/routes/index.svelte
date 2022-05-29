<script lang="ts">
	import WebsiteFooter from '$lib/components/global/WebsiteFooter.svelte';
	import BookReasons from '$lib/components/index/BookReasons.svelte';
	import CtaSection from '$lib/components/index/CTASection.svelte';
	import Hero from '$lib/components/index/Hero.svelte';
	import PlaceShowcase from '$lib/components/index/PlaceShowcase.svelte';
</script>

<Hero
	imgSrc="/images/index/danilo_view.png"
	title="Explore the best Naples has to offer."
	subtitle="Enjoy discounts and travel rewards at hundreds of hotels, and excersions worldwide"
/>

<div class="showcase-wrapper">
	<PlaceShowcase title="Unforgettable activities to do in Naples" />
</div>

<section class="floating-text section container">
	<div class="content">
		<h2>Easy booking & tour guides tailored to Naples</h2>
	</div>
</section>

<BookReasons title="Why book with DMT?" />

<CtaSection />

<WebsiteFooter />

<style lang="scss">
	.showcase-wrapper {
		overflow-x: hidden;
	}
	.floating-text {
		h2 {
			line-height: var(--line-sm);
		}
		.content {
			display: flex;
			flex-direction: column;
			gap: var(--space-xs);
			// text-align: center;
			max-width: 55ch;
		}
	}
</style>
