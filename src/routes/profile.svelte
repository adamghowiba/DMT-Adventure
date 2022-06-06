<script lang="ts">
	import ProfileDetails from '$lib/components/profile/ProfileDetails.svelte';
	import ProfilePassword from '$lib/components/profile/ProfilePassword.svelte';
	import ProfileSidebar from '$lib/components/profile/ProfileSidebar.svelte';
	import { USER } from '$lib/constants/user';
</script>

<main class="container section--sm">
	<div class="sidebar">
		<ProfileSidebar />
	</div>

	<form action="" on:submit|preventDefault>
		<ProfileDetails user={USER} />
		<ProfilePassword />
	</form>
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: minmax(300px, auto) 1fr;
		gap: var(--space-sm);
	}
	form {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	@media screen and (max-width: 768px) {
		main {
			grid-template-columns: 1fr;
		}
		.sidebar {
			display: none;
		}
	}
</style>
