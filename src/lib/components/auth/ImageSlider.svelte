<script lang="ts">
	import { slide } from 'svelte/transition';

	interface Slide {
		imageSrc: string;
		title: string;
		subtitle: string;
	}

	let currentSlideIndex = 0;

	const SLIDES: Slide[] = [
		{
			imageSrc: '/icon/people_traveling.svg',
			title: 'Recapture The Magic',
			subtitle:
				"Browse and book tours and activities so incredible, you'll want to tell your friends."
		}
	];
</script>

<div class="slider">
	{#each SLIDES as slide}
		<div class="images">
			<img src={slide.imageSrc} alt="" />
		</div>
	{/each}

	<div class="slider__content">
		<h2>{SLIDES[currentSlideIndex].title}</h2>
		<p>{SLIDES[currentSlideIndex].subtitle}</p>
	</div>
</div>

<style lang="scss">
	.slider {
		width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
		height: 100%;
		background-color: var(--color-offwhite);
        padding: var(--space-xl);
        padding-bottom: var(--space-section-base);
	}

    .images {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        img {
            width: 100%;
            max-width: 400px;
        }
    }
</style>
