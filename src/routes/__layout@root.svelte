<script lang="ts">
	import Navbar from '$lib/components/navbar/Navbar.svelte';
</script>

<Navbar />
<main>
	<slot />
</main>

<style lang="scss">
main {
	padding-top: 83px;
}
</style>
