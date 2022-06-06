<script lang="ts">
	import Icon from '@iconify/svelte';
	import Button from '../global/Button.svelte';

	export let title: string;
	export let location: string;
	export let saveAction: boolean = true;
	export let shareAction: boolean = true;
</script>

<header class="container header">
	<div class="header__title">
		<h2>{title}</h2>
		<span class="header__location">
			<Icon icon="entypo:location-pin" width={20} height={20} color="var(--color-primary)" />
			{location}
		</span>
	</div>

	<div class="header__actions">
		<Button style="border" size="small">Share</Button>
		<Button style="border" size="small">Save</Button>
	</div>
</header>

<style lang="scss">
	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding-top: var(--space-md);
		padding-bottom: var(--space-md);
		gap: var(--space-sm);

		&__title {
			display: flex;
			flex-direction: column;
		}

		&__location {
			display: flex;
			align-items: center;
			gap: var(--space-2xs);
			margin-top: -4px;
		}

		&__actions {
			display: flex;
			gap: var(--space-sm);
		}
	}

	@media screen and (max-width: 1024px) {
		.header {
			&__actions {
				gap: var(--space-xs);
			}
		}
	}

	@media screen and (max-width: 597px) {
		.header {
			// text-align: center;
			align-items: center;
			gap: var(--space-2xs);
			padding-bottom: 0;

			h2 {
				font-size: var(--text-h3);
			}

			&__location {
				font-size: var(--text-h5);
			}

			&__actions {
				display: none;
			}
		}
	}
</style>
