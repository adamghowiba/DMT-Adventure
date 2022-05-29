<script lang="ts">
	import type { ListingNavGroups } from '$lib/types/link-context';
	import { setContext } from 'svelte';

	export let title: ListingNavGroups;

	setContext<ListingNavGroups>('navGroup', title);
</script>

<div class="group">
	<slot />
</div>

<style lang="scss">
	.group {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}
</style>
