<script lang="ts">
	import DetailDescription from '$lib/dashboard/listing/forms/detail/DetailDescription.svelte';
	import DetailTitle from '$lib/dashboard/listing/forms/detail/DetailTitle.svelte';
	import FormWrapper from '$lib/dashboard/listing/FormWrapper.svelte';
	import ListingEditContainer from '$lib/dashboard/listing/ListingEditContainer.svelte';
	import ListingWrap from '$lib/dashboard/listing/ListingWrap.svelte';
</script>

<ListingEditContainer title="details">
	<ListingWrap title="Listing Basics">
		<DetailTitle value="Hilton Grand Hotel" />
		<DetailDescription />
		<FormWrapper title="Listing status" />
	</ListingWrap>

	<ListingWrap title="Amentities">
		<FormWrapper title="listing title" />
	</ListingWrap>

	<ListingWrap title="Photos">
		<FormWrapper title="listing title" />
	</ListingWrap>
</ListingEditContainer>

<style lang="scss">
</style>
