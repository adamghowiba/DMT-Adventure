<script lang="ts">
	import type { IconType } from '$lib/types/icon';
	import LocalIcon from '../global/LocalIcon.svelte';

	export let title: string;

	interface BookReason {
		title: string;
		desc: string;
		icon: IconType;
	}

	const BOOK_REASONS: BookReason[] = [
		{
			title: 'Peace of mind',
			desc: 'Our Book with Confidence guarantee gives you 24/7 support.',
			icon: 'secure'
		},
		{
			title: 'More for less',
			desc: 'More space, more privacy, more amenities — more value.',
			icon: 'money'
		},
		{
			title: 'Quality at our core',
			desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit',
			icon: 'coffe'
		}
	];
</script>

<section class="reasons container section">
	<h1>{title}</h1>

	<div class="items">
		{#each BOOK_REASONS as reason}
			<div class="items__item">
				<LocalIcon icon={reason.icon} />
				<h4>{reason.title}</h4>
				<p>{reason.desc}</p>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	.reasons {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xl);
		justify-content: center;
	}
	.items {
		display: flex;
		gap: var(--space-lg);

		&__item {
			display: flex;
			flex-direction: column;
			gap: var(--space-2xs);
			max-width: 35ch;
		}

		h4 {
			color: var(--color-text-heading);
		}

		P {
			color: var(--color-text-body);
		}
	}

	@media screen and (max-width: 597px) {
		.reasons {
			align-items: center;
			text-align: center;
		}
		.items {
			flex-direction: column;

			&__item {
				align-items: center;
			}
		}
	}
</style>
