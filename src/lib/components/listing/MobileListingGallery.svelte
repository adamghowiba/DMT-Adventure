<script lang="ts">
	export let images: string[];
</script>

<div class="slider">
	<div class="images">
		{#each images as image}
			<img src={image} alt="" />
		{/each}
	</div>
</div>

<style lang="scss">
	.slider {
		overflow: hidden;
	}

	.images {
		display: flex;
		height: 100%;
		min-height: 20rem;
		max-height: 70vw;

		img {
			width: 100%;
			flex: 1 0 auto;
			height: 100%;
		}
	}
</style>
