<script lang="ts">
	import Icon from '@iconify/svelte';

	interface NavbarLink {
		icon: string;
		href: string;
		name: string;
		dropdown?: NavbarLink[];
	}

	let iconSize = 18;
	let NAV_LINKS: NavbarLink[] = [
		{
			name: 'Login',
			icon: 'akar-icons:person',
			href: '/login'
		},
		{
			name: 'Sign Up',
			icon: 'akar-icons:person-add',
			href: '/signup'
		},
		{
			name: 'Help',
			icon: 'bx:help-circle',
			href: '/'
		}
	];
</script>

<nav>
	<a href="/">
		<img src="/images/logo.png" alt="" class="logo" />
	</a>

	<div class="links">
		{#each NAV_LINKS as link}
			<a href={link.href} class="links__item">
				<Icon icon={link.icon} color="var(--color-primary)" width={iconSize} height={iconSize} />
				<h4>{link.name}</h4>
			</a>
		{/each}
	</div>
</nav>

<style lang="scss">
	nav {
        position: fixed;
		top: 0;
		left: 0;
        width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 83px;
		background-color: var(--color-white);
		z-index: 10;
        padding: 0 var(--space-sm);
		border-bottom: 1px solid var(--color-trans);

		.logo {
			max-width: 100%;
			height: min-content;
		}
	}

	.links {
		display: flex;
		gap: var(--space-md);

		&__item {
			display: flex;
			align-items: center;
			gap: var(--space-2xs);
		}
	}

	@media screen and (max-width: 768px) {
		.links {
			display: none;
		}
	}
</style>
