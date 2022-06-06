<script lang="ts">
	import WebsiteFooter from '$lib/components/global/WebsiteFooter.svelte';
	import BookReasons from '$lib/components/index/BookReasons.svelte';
	import CtaSection from '$lib/components/index/CTASection.svelte';
	import Hero from '$lib/components/index/Hero.svelte';
	import PlaceShowcase from '$lib/components/index/PlaceShowcase.svelte';
	</script>

<Hero
	imgSrc="/images/index/nepal_sunset.jpg"
	title="Discover Nepal."
	subtitle="Find and book great expierences in Nepal"
/>

<div class="showcase-wrapper">
	<PlaceShowcase title="Unforgettable activities to do in Naples" />
</div>

<BookReasons title="Why book with DMT?" />

<CtaSection />

<WebsiteFooter />

<style lang="scss">
	.showcase-wrapper {
		overflow-x: hidden;
	}
</style>
