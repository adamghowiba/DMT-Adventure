<script lang="ts">
	import BookWrapper from './BookWrapper.svelte';
</script>

<BookWrapper title="Cancellation policy" gap="var(--space-sm)">
	<p>This reservation is refundable before May 28, 2022</p>
	<p>Our Extenuating Circumstances policy does not cover travel disruptions caused by COVID-19.</p>
</BookWrapper>

<style lang="scss">
    p {
        max-width: 50ch;
        font-size: var(--text-base-lg);
    }
</style>
