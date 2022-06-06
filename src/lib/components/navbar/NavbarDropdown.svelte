<script lang="ts">
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import Hr from '../global/HR.svelte';
	
	const ICON_PROPS = {
		width: 18,
		height: 18
	};
</script>

<div class="dropdown" transition:fade={{ duration: 100 }}>
	<a href="/profile" class="item">
		<Icon icon="clarity:avatar-line" color="var(--color-text-body)" {...ICON_PROPS} />
		<span class="item__link">Profile</span>
	</a>

	<a href="/" class="item">
		<Icon icon="eva:briefcase-outline" {...ICON_PROPS} />
		<span class="item__link">My Trips</span>
	</a>

	<a href="/dashboard/listing" class="item">
		<Icon icon="ant-design:dashboard-outlined" {...ICON_PROPS} />
		<span class="item__link">Manage Listings</span>
	</a>

	<div class="divider">
		<Hr />
	</div>
	<a href="/" class="item">
		<Icon icon="icon-park-outline:logout" {...ICON_PROPS} />
		<span class="item__link">Logout</span>
	</a>
</div>

<style lang="scss">
	.dropdown {
		display: flex;
		flex-direction: column;
		padding: var(--space-3xs) 0;
		bottom: 0;
		right: 0;
		// width: 140%;
		width: max-content;
		transform: translateY(105%);
		background-color: var(--color-white);
		height: auto;
		box-shadow: var(--shadow-image);
		border-radius: var(--br-sm);
		border: 1px solid var(--color-trans);
		position: absolute;
		z-index: 1000;
	}
	.divider {
		width: 80%;
		margin: 0 auto;
	}
	.item {
		padding: var(--space-xs) var(--space-xs);
		transition: background-color 0.15s ease-in-out;
		display: flex;
		align-items: center;
		gap: var(--space-2xs);
		color: var(--color-text-heading);
		font-size: var(--text-base-lg);

		&__link {
			font-weight: 500;
			text-align: left;
		}

		&:hover {
			background-color: rgba(88, 89, 92, 0.066);
		}
	}
</style>
