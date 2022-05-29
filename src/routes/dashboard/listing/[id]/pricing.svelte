<script lang="ts">
	import FormWrapper from '$lib/dashboard/listing/FormWrapper.svelte';
	import ListingEditContainer from '$lib/dashboard/listing/ListingEditContainer.svelte';
	import ListingWrap from '$lib/dashboard/listing/ListingWrap.svelte';
	import type { ListingNavGroups } from '$lib/types/link-context';
	import { setContext } from 'svelte';
</script>

<ListingEditContainer title="pricing">
	<ListingWrap title="Listing Basics">
		<FormWrapper title="listing title" />
		<FormWrapper title="Listing description" />
		<FormWrapper title="Listing status" />
	</ListingWrap>

	<ListingWrap title="Amentities">
		<FormWrapper title="listing title" />
	</ListingWrap>

	<ListingWrap title="Photos">
		<FormWrapper title="listing title" />
	</ListingWrap>

	<div class="filler" />
</ListingEditContainer>

<style lang="scss">
	.filler {
		height: 200vh;
	}
</style>
