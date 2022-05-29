<script lang="ts">
	import BookTapbar from '$lib/components/book/BookTapbar.svelte';
	import SmallFooter from '$lib/components/global/SmallFooter.svelte';
</script>

<BookTapbar />
<slot />
<SmallFooter />

<style lang="scss">
</style>
