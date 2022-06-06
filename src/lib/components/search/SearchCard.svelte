<script lang="ts">
	import RatingShort from '../global/RatingShort.svelte';

	export let title: string;
	export let subtitle: string;
	export let desc: string;
	export let rating: number;
	export let ratingTotal: number;
	export let subtotal: number;
	export let imgSrc: string;
	
	// export let total: number;
	// export let availableCount: number = 0;
	// export let isNew: boolean = false;
</script>

<a href="/place/{encodeURIComponent(title)}" class="card" on:mouseenter on:mouseleave>
	<img class="card__thumbnail" src={imgSrc} alt={title} />

	<div class="card__body">
		<div class="details">
			<h4>{title}</h4>
			<p class="details__subtitle">{subtitle}</p>
			<p class="details__desc">{desc}</p>
		</div>

		<footer class="footer">
			<div class="details__rating">
				<RatingShort {rating} {ratingTotal} />
			</div>

			<div class="pricing">
				<h3>${subtotal} <span class="pricing__suffix">/ night</span></h3>
				<!-- <span class="pricing__subtotal">${total} total</span> -->
			</div>
		</footer>
	</div>
</a>

<style lang="scss">
	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.card {
		border-radius: var(--br-lg);
		box-shadow: var(--shadow-image);

		&__thumbnail {
			width: 100%;
			object-fit: cover;
			max-height: 337px;
			object-position: bottom;
			border-top-left-radius: inherit;
			border-top-right-radius: inherit;
		}

		&__body {
			display: flex;
			flex-direction: column;
			padding: var(--space-xs);
		}
	}

	.details {
		max-width: 40ch;
		display: flex;
		flex-direction: column;
		gap: 4px;

		h4 {
			padding-bottom: 4px;
			color: var(--color-primary);
		}

		&__subtitle {
			color: var(--color-text-heading);
			font-weight: var(--fw-medium);
		}

		&__desc {
			color: var(--color-gray-muted);
		}

		&__rating {
			margin-top: 8px;
		}
	}

	.pricing {
		h3 {
			white-space: nowrap;
			line-height: normal;
		}

		&__suffix {
			font-size: var(--text-h4);
			line-height: normal;
			font-weight: var(--fw-regular);
		}

		// &__subtotal {
		// 	display: block;
		// 	text-align: right;
		// 	color: var(--color-gray-muted);
		// 	opacity: 0.8;
		// }
	}

	@media screen and (max-width: 768px) {
		.card {
			&__thumbnail {
				max-height: 250px;
			}
		}
	}

	@media screen and (max-width: 640px) {
		.card {
			&__thumbnail {
				max-height: 200px;
			}
		}

		.footer {
			align-items: center;
			margin-top: var(--space-xs);
		}

		.pricing {
			h3 {
				font-size: var(--text-h4);
			}

			&__suffix {
				font-size: var(--text-h5);
			}
		}
	}
</style>
