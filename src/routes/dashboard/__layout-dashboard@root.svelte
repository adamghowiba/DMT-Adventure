<script lang="ts">
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import DashboardNavbar from '$lib/dashboard/DashboardNavbar.svelte';
	import Sidebar from '$lib/dashboard/sidebar/Sidebar.svelte';
</script>

<main>
	<DashboardNavbar />

	<div class="sidebar">
		<Sidebar />
	</div>

	<div class="content">
		<slot />
	</div>
</main>

<style lang="scss">
	main {
		background-color: var(--color-offwhite);
		width: 100%;
		height: auto;
		min-height: 100%;

		/* Padding from Sidebar & Navbar */
		// padding-left: 250px;
		// padding-top: 83px;
	}
	.content {
		margin-left: 250px;
		margin-top: 83px;
		position: relative;
		padding: var(--space-md);
	}
</style>
