<script lang="ts">
	export let rating: number;

	const getStarFill = (number: number) => {
		if (Math.floor(rating) > number) return 'filled';
		if (rating % 1 != 0 && rating > number) return 'half';
	};

	const getStarPercentage = () => {
		return percentage(getDoubleNumber(), 1) / 5;
	};

	const getDoubleNumber = () => parseFloat((rating % 1).toFixed(2));

	const percentage = (partialValue: number, totalValue: number) => {
		return (100 * partialValue) / totalValue;
	};
</script>

<div class="rating">
	{#each Array(5) as _, i}
		<span class="star {getStarFill(i)}" style="--width: {getStarPercentage()}px" />
	{/each}
</div>

<style lang="scss">
	.rating {
		display: flex;
		gap: var(--space-2xs);
	}

	.star {
		font-size: x-large;
		display: inline-block;
		color: var(--color-trans);
	}
	.star:last-child {
		margin-right: 0;
	}
	.star:before {
		content: '\2605';
	}
	.star.filled {
		color: var(--color-primary);
	}
	.star.half:after {
		content: '\2605';
		color: var(--color-primary);
		position: absolute;
		margin-left: -20px;
		width: var(--width);
		overflow: hidden;
	}
</style>
