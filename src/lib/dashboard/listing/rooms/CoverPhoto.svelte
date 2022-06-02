<script lang="ts">
	import Button from '$lib/components/global/Button.svelte';
	import RoomWrapper from './RoomWrapper.svelte';

	export let uploadedImageSrc: string | ArrayBuffer = '';

	let fileInputElement: HTMLInputElement;
	let fileError: string = '';

	const readFile = (file: Blob) => {
		const reader = new FileReader();
		reader.addEventListener('load', (event) => {
			const result = event.target?.result;
			if (!result) return;
			uploadedImageSrc = result;
		});

		reader.readAsDataURL(file);
	};

	const handleFileChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (!target.files) return;

		const file = target.files[0];
		if (!file) return;

		const fileSize = parseFloat((file.size / 1024 / 1024).toFixed(3));
		if (fileSize > 2) return (fileError = 'File must be smaller than 5 MB');

		if (!file.type.includes('image/')) return (fileError = 'File must be an image');

		readFile(target.files[0]);
	};
</script>

<RoomWrapper>
	<div class="cover">
		<div class="cover__left">
			<h4>Cover photo</h4>
			<p>
				Show guests what the room will look like. It's recommended to use a photo that showcases the
				rooms main areas.
			</p>
			<Button style="border" size="small" on:click={() => fileInputElement.click()}
				>Change photo</Button
			>
		</div>

		<div class="upload-wrap">
			<div class="upload">
				<input
					type="file"
					name=""
					accept=".jpg, .jpef, .png, image/*"
					on:change={handleFileChange}
					bind:this={fileInputElement}
				/>
				{#if !uploadedImageSrc}
					<h5>Drag and drop your photos here</h5>
				{:else}
					<img class="upload__image" src={uploadedImageSrc.toString()} alt="Uploaded" />
				{/if}
			</div>
			<span class="error">{fileError}</span>
		</div>
	</div>
</RoomWrapper>

<style lang="scss">
	.cover {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-lg);
		align-items: center;

		&__left {
			display: flex;
			flex-direction: column;
			gap: var(--space-2xs);
		}

		&__left p {
			margin-bottom: var(--space-xs);
		}
	}

	.error {
		color: var(--color-red);
	}

	.upload-wrap {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		height: 100%;
		min-height: 250px;
	}

	.upload {
		display: flex;
		height: 100%;
		flex-direction: column;
		gap: var(--space-xs);
		align-items: center;
		justify-content: center;
		border: 1px dashed var(--color-gray-light);
		position: relative;

		&__image {
			width: 100%;
			height: 100%;
			position: absolute;
			pointer-events: none;
			object-fit: cover;
			max-width: 100%;
		}

		input {
			opacity: 0;
			position: absolute;
			height: 100%;
			width: 100%;
		}
	}
</style>
