<script lang="ts">
	import ProfileDetails from '$lib/profile/ProfileDetails.svelte';
	import ProfilePassword from '$lib/profile/ProfilePassword.svelte';
	import ProfileSidebar from '$lib/profile/ProfileSidebar.svelte';
</script>

<main class="container section--sm">
	<div class="sidebar">
		<ProfileSidebar />
	</div>

	<form action="" on:submit|preventDefault>
		<ProfileDetails />
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
