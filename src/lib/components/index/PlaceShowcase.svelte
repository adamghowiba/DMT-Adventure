<script lang="ts">
	import Icon from '@iconify/svelte';
	import ShowcaseCard from '../global/ShowcaseCard.svelte';
	import DateDropdown from '../searchbar/DateDropdown.svelte';

	export let title: string;

	let currentSlide = 0;
	let showcaseCardsElement: HTMLElement;
	let cardWidth: number = 312;
	let cardGap: number = 16;

	$: cardFullWidth = cardWidth + cardGap;

	interface ShowcaseCard {
		title: string;
		subtitle: string;
		imgSrc: string;
		rating: number;
		ratingTotal: number;
		overlay?: boolean;
	}

	const SHOWCASE_CARDS: ShowcaseCard[] = [
		{
			title: 'A beautiful light-filled shopping arcade',
			subtitle: 'Shopping & Explore',
			imgSrc: '/images/global/galleria_umberto.png',
			rating: 4.9,
			ratingTotal: 120,
			overlay: false
		},
		{
			title: 'A beautiful light-filled shopping arcade',
			subtitle: 'Shopping & Explore',
			imgSrc: 'images/global/cappella.png',
			rating: 4.9,
			ratingTotal: 120,
			overlay: true
		},
		{
			title: 'A beautiful light-filled shopping arcade',
			subtitle: 'Shopping & Explore',
			imgSrc: '/images/global/castel_ovo.png',
			rating: 4.9,
			ratingTotal: 120,
			overlay: true
		},
		{
			title: 'A beautiful light-filled shopping arcade',
			subtitle: 'Shopping & Explore',
			imgSrc: '/images/global/castel_ovo.png',
			rating: 4.9,
			ratingTotal: 120,
			overlay: true
		}
	];

	const handleNextSlide = () => {
		const cards = showcaseCardsElement.querySelectorAll<HTMLElement>('.card');
		const lastCard = cards[cards.length - 1];
		const lastCardX = lastCard.getBoundingClientRect().x;

		if (lastCardX + cardFullWidth / 2 - window.innerWidth <= 0) return;

		showcaseCardsElement.style.transform = `translateX(-${cardFullWidth * ++currentSlide}px)`;
	};

	const handlePreviousSlide = () => {
		if (currentSlide == 0) return;

		showcaseCardsElement.style.transform = `translateX(-${cardFullWidth * --currentSlide}px)`;
	};
	// $: console.log('Current side', currentSlide);
</script>

<section class="showcase section" style="--cardGap: {cardGap}px;">
	<h1 class="showcase__title">{title}</h1>

	<div class="cards-wrap">
		<div class="cards" bind:this={showcaseCardsElement}>
			{#each SHOWCASE_CARDS as card, i}
				<ShowcaseCard bind:cardWidth {...card} active={i === currentSlide} />
			{/each}
		</div>
	</div>

	<div class="cards__controls">
		<div class="control" class:disabled={currentSlide === 0} on:click={handlePreviousSlide}>
			<Icon
				icon="ic:round-navigate-next"
				width={20}
				height={20}
				rotate={2}
				color="var(--color-primary)"
			/>
		</div>
		<div
			class="control"
			class:disabled={currentSlide >= SHOWCASE_CARDS.length}
			on:click={handleNextSlide}
		>
			<Icon icon="ic:round-navigate-next" width={20} height={20} color="var(--color-primary)" />
		</div>
	</div>
</section>

<style lang="scss">
	.showcase {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		gap: var(--space-3xl);
		// overflow-x: hidden;

		padding-left: var(--space-section-sm);
		margin-bottom: var(--space-section-base);
		padding-bottom: 0;

		&__title {
			max-width: 12ch;
			font-size: 44px;
			font-weight: var(--fw-bold);

			line-height: 1.3;
		}
	}

	.cards-wrap {
		position: relative;
		width: auto;
		clip-path: inset(-100vw -100vw -100vw 0);
	}

	.cards {
		display: flex;
		flex: 1 0 auto;
		gap: var(--cardGap);
		// transform: translateX(110px);
		transition: transform 0.18s ease-in-out;
		// overflow: hidden;

		&__controls {
			display: flex;
			position: absolute;
			right: var(--space-sm);
			// bottom: 7rem;
			bottom: 1rem;
			gap: var(--space-xs);
		}
	}

	.control {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 35px;
		height: 35px;
		border: 1px solid var(--color-primary);
		border-radius: 50%;

		&:hover {
			cursor: pointer;
		}
		&.disabled:hover {
			cursor: auto;
		}

		&.disabled {
			opacity: 0.5;
		}
	}

	@media screen and (max-width: 768px) {
		.showcase {
			flex-direction: column;
			padding-left: var(--space-xs);
			padding-right: var(--space-xs);

			&__title {
				text-align: center;
			}
		}
		.cards-wrap {
			width: 100%;
			overflow-x: hidden;
		}

		.cards {
			&__controls {
				bottom: -1rem;
				transform: translateY(100%);
			}
		}
	}
</style>
