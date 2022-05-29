<script lang="ts">
	import SidebarLink from './SidebarLink.svelte';
</script>

<nav class="sidebar">
	<SidebarLink icon="ant-design:dashboard-outlined" href="/dashboard">Home</SidebarLink>
	<SidebarLink icon="ant-design:mail-outlined" href="/dashboard/inbox">Inbox</SidebarLink>
	<SidebarLink icon="bx:book-bookmark" href="/dashboard/listing">Listings</SidebarLink>
	<SidebarLink icon="clarity:list-line" dropdownLinks={['Reserve list', 'Market Form']}>
		Reseervations
	</SidebarLink>
</nav>

<style lang="scss">
	.sidebar {
		position: fixed;
		left: 0;
		width: 250px;
		height: 100%;
		background-color: var(--color-white);
		border-right: 1px solid var(--color-trans);
	}
</style>
