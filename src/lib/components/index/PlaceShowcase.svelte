<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import Button from '../../components/global/Button.svelte';
	import ShowcaseCard from '../../components/global/ShowcaseCard.svelte';

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
		if (currentSlide >= SHOWCASE_CARDS.length - 1) return;

		showcaseCardsElement.style.transform = `translateX(-${cardFullWidth * ++currentSlide}px)`;
	};

	const setSlide = (index: number): unknown => {
		if (index >= SHOWCASE_CARDS.length) return setSlide(SHOWCASE_CARDS.length - 1);
		if (index < 0) return setSlide(0);

		showcaseCardsElement.style.transitionDuration = '0.35s';
		showcaseCardsElement.style.transitionTimingFunction = 'ease-out';

		showcaseCardsElement.style.transform = `translateX(-${cardFullWidth * index}px)`;
		currentSlide = index;
	};

	let isMouseDown: boolean = false;

	const handlePreviousSlide = () => {
		if (currentSlide == 0) return;

		showcaseCardsElement.style.transform = `translateX(-${cardFullWidth * --currentSlide}px)`;
	};

	const handleMouseMove = (event: MouseEvent) => {
		if (!isMouseDown) return;
	};

	let currentTouchX: number = 0;
	let startingTouchX: number = 0;
	let currentTransformAmount: number = 0;

	const handleTouchMove = (event: TouchEvent) => {
		event.preventDefault();
		currentTouchX = event.touches[0].clientX;

		let newDistance = currentTouchX - startingTouchX;

		showcaseCardsElement.style.transform = `translateX(${newDistance}px)`;
	};

	const handleTouchEnd = (event: TouchEvent) => {
		currentTransformAmount = ~showcaseCardsElement.getBoundingClientRect().left;

		const cardSnap = Math.round(currentTransformAmount / cardFullWidth);
		console.log(cardSnap);
		setSlide(cardSnap);
	};

	const handleTouchStart = (event: TouchEvent) => {
		showcaseCardsElement.style.transitionDuration = '0.028s';
		showcaseCardsElement.style.transitionTimingFunction = 'linear';
		currentTransformAmount = ~showcaseCardsElement.getBoundingClientRect().left;

		startingTouchX = currentTransformAmount + event.touches[0].pageX;
	};

	onMount(() => {
		showcaseCardsElement.addEventListener('touchmove', handleTouchMove, { passive: true });
		showcaseCardsElement.addEventListener('touchstart', handleTouchStart, { passive: true });
		showcaseCardsElement.addEventListener('touchend', handleTouchEnd, { passive: true });

		return () => {
			showcaseCardsElement.removeEventListener('touchmove', handleTouchMove);
			showcaseCardsElement.removeEventListener('touchstart', handleTouchStart);
			showcaseCardsElement.addEventListener('touchend', handleTouchEnd);
		};
	});
	// $: console.log('Current side', currentSlide);
</script>

<section
	class="showcase section container"
	style="--cardGap: {cardGap}px;"
	on:mousemove={handleMouseMove}
	on:mousedown={() => (isMouseDown = true)}
	on:mouseup={() => (isMouseDown = false)}
>
	<h1 class="showcase__title">{title}</h1>

	<div class="cards-wrap">
		<div class="cards" bind:this={showcaseCardsElement}>
			{#each SHOWCASE_CARDS as card, i}
				<ShowcaseCard bind:cardWidth {...card} active={i === currentSlide} />
			{/each}
			<div class="card-empty">
				<h3>Search For Location</h3>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur, nemo. Nihil, non
					saepe ratione aliquid libero impedit! Id explicabo in officia? Nesciunt consequatur
					consequuntur esse ducimus atque a numquam eligendi.
				</p>
				<Button>Explore</Button>
			</div>
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
		transition: transform 0.25s ease-in-out;
		// transform: translateX(110px);
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
	.card-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		min-width: 312px;
		width: 100%;
		margin: auto;
		gap: var(--space-2xs);

		p {
			margin-bottom: var(--space-2xs);
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
			gap: var(--space-md);

			&__title {
				max-width: 20ch;
				text-align: center;
				font-size: 40px;
			}
		}
		.cards-wrap {
			width: 100%;
			overflow-x: hidden;
		}

		.cards {
			transition: transform 0.028s linear;

			&__controls {
				bottom: -1rem;
				transform: translateY(100%);
			}
		}
	}

	@media screen and (max-width: 768px) {
		.showcase {
			gap: var(--space-sm);

			&__title {
				text-align: center;
				font-size: 35px;
			}
		}
	}
</style>
