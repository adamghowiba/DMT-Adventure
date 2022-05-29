<script lang="ts">
	export let thumbnail: string;
	export let name: string;
	export let date: Date;
	export let content: string;

	const parseDate = (date: Date) => {
		return date.toLocaleDateString('en-us', { dateStyle: 'short' });
	};
</script>

<div class="review">
	<!-- Header (thumbnail, name, date) -->
	<div class="review__header">
		<img class="review__thumbnail" src={thumbnail} alt="" />

		<div class="info">
			<h4>{name}</h4>
			<span class="info__date">{parseDate(date)}</span>
		</div>
	</div>

	<p>{content}</p>
</div>

<style lang="scss">
	.review {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);

		&__header {
			display: flex;
			gap: var(--space-2xs);
			align-items: center;
		}

        &__thumbnail {
            width:  50px;
            height: 50px;
            object-fit: contain;
        }
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: var(--space-3xs);

		&__date {
			color: var(--color-gray-muted);
			font-size: var(--text-h6);
		}
	}

    p {
        line-height: var(--line-md);
    }
</style>
