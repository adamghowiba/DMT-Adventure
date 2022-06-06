<script lang="ts">
	import type { LinkContext } from '$lib/types/link-context';
	import { getContext,onMount } from 'svelte';
		
	export let gap: string | null = null;
	export let title: string | null = null;
	export let hr: boolean = true;
	export let navTitle: string | null = null;

	let sectionElement: HTMLElement;

	const { setLink, linkStore } = getContext<LinkContext>('links');

	onMount(() => {
		if (navTitle && setLink) {
			if (!$linkStore.find((link) => link.name == title)) {
				setLink({ name: navTitle, element: sectionElement });
			}
		}
	});
</script>

<section class:hr style="--gap: {gap}" bind:this={sectionElement}>
	{#if title}
		<h2>{title}</h2>
	{/if}

	<div class="content" class:flex={gap}>
		<slot />
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);

		&.hr {
			padding-top: var(--space-md);
			border-top: 1px solid var(--color-trans);
		}

		.content.flex {
			display: flex;
			flex-direction: column;
			gap: var(--gap);
		}
	}
</style>
