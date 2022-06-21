<script lang="ts">
	import { session } from '$app/stores';
	import { clickOutside } from '$lib/actions/clickOutside';
	import Icon from '@iconify/svelte';
	import Button from '../global/Button.svelte';
	import SearchBar from '../searchbar/SearchBar.svelte';
	import NavbarDropdown from './NavbarDropdown.svelte';
	
	export let location: string;
	export let checkIn: Date;
	export let checkOut: Date;

	interface NavbarLink {
		icon: string;
		href: string;
		name: string;
		dropdown?: NavbarLink[];
	}

	let isProfileDropdownOpen = false;

	const ICON_PROPS = {
		size: 22,
		color: 'var(--color-primary)'
	};

	let NAV_LINKS: NavbarLink[] = [
		{
			name: 'Contat',
			icon: 'bx:help-circle',
			href: '/contact'
		}
	];
</script>

<div class="wrapper">
	<nav class="container">
		<a href="/">
			<img src="/images/logo.png" alt="" class="logo" />
		</a>

		<div class="links">
			{#each NAV_LINKS as link}
				<a href={link.href} class="item">
					<Icon
						icon={link.icon}
						color={ICON_PROPS.color}
						width={ICON_PROPS.size}
						height={ICON_PROPS.size}
					/>
					<h4>{link.name}</h4>
				</a>
			{/each}
			{#if $session.user}
				<button
					href=""
					class="item"
					use:clickOutside={() => (isProfileDropdownOpen = false)}
					on:click={() => (isProfileDropdownOpen = !isProfileDropdownOpen)}
				>
					<img src="/images/global/no_avatar.png.png" class="avatar" alt="Placeholder Avatar" />
					<h4>{$session.user.firstName} {$session.user.lastName.substring(0, 1)}.</h4>
					<Icon icon="akar-icons:chevron-down" height={15} width={15} color={ICON_PROPS.color} />

					{#if isProfileDropdownOpen}
						<NavbarDropdown />
					{/if}
				</button>
			{:else}
				<a href="/signup" class="item">
					<Icon
						icon="akar-icons:person-add"
						color={ICON_PROPS.color}
						width={ICON_PROPS.size}
						height={ICON_PROPS.size}
					/>
					<h4>Sign Up</h4>
				</a>
				<div href="/login" class="item">
					<Icon
						icon="akar-icons:person-add"
						color={ICON_PROPS.color}
						width={ICON_PROPS.size}
						height={ICON_PROPS.size}
					/>
					<h4>Login</h4>
				</div>
			{/if}
			<Button style="border" size="small" color="purple">Get Started</Button>
		</div>
	</nav>

	<div class="container">
		<div class="search">
			<SearchBar locationValue={location} startDate={checkIn} endDate={checkOut} />
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		border-bottom: 1px solid var(--color-trans);
		background-color: var(--color-white);
		position: relative;
		z-index: 100;
	}
	.search {
		max-width: 800px;
		margin-bottom: var(--space-sm);
		&__dates {
			display: flex;
		}
	}
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 83px;
		left: 50%;
		z-index: 1000;
		background-color: var(--color-white);
		border-radius: 20px;

		.logo {
			max-width: 100%;
			height: min-content;
		}
	}

	button {
		appearance: none;
		background-color: transparent;
		border: none;
		outline: none;
		font-family: inherit;
		padding: 0;
		line-height: 1rem;
		color: var(--color-text-heading);
		font-weight: 500;
	}

	.links {
		display: flex;
		gap: var(--space-md);

		h4 {
			font-size: var(--text-base-lg);
			font-weight: 500;
			color: var(--color-text-heading);
		}
	}

	.item {
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--space-2xs);

		&:hover {
			cursor: pointer;
		}
	}

	.avatar {
		width: 25px;
		height: 25px;
		border: 1px solid var(--color-trans);
		border-radius: 50%;
	}

	@media screen and (max-width: 768px) {
		.links {
			display: none;
		}
	}
</style>
