<script lang="ts">
	export let images: string[];
</script>

<div class="gallery">
	<div class="images">
		<img src={images[0]} alt="" />

		<div class="images__square">
			<img src={images[1]} alt="" />
			<img src={images[2]} alt="" />
			<img src={images[3]} alt="" />
			<img src={images[4]} alt="" />
		</div>
	</div>
</div>

<style lang="scss">
	.gallery {
		height: 30rem;
	}

	.images,
	.images__square {
		gap: var(--space-3xs);
	}

	.images {
		display: grid;
		grid-template-columns: 1.3fr 1fr;
		grid-template-rows: 100%;
		height: 100%;

		&__square {
			height: 100%;
			display: grid;
			flex-direction: column;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(2, minmax(0, 1fr));
		}

		img {
			display: block;
			width: 100%;
			max-width: 100%;
			max-height: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
