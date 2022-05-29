<script lang="ts">
	import DateDropdown from '$lib/components/searchbar/DateDropdown.svelte';
	import SearchBar from '../searchbar/SearchBar.svelte';

	export let imgSrc: string;
	export let title: string;
	export let subtitle: string;
</script>

<section class="hero">
	<!-- Image & Overlay -->
	<img class="hero__image" src={imgSrc} alt="Looking out over ocean with clear blue waters" />
	<div class="overlay overlay--linear" />

	<header class="container">
		<h1>{title}</h1>
		<h5>{subtitle}</h5>
		<SearchBar />
	</header>
</section>

<style lang="scss">
	.hero {
		position: relative;
		min-height: 550px;
		height: 550px;

		&__image {
			position: absolute;
			width: 100%;
			height: 100%;
		}
	}

	header {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: var(--space-2xs);
		width: 100%;
		height: 100%;
		color: var(--color-white);

		h5 {
			max-width: 60ch;
			line-height: var(--line-base);
			font-weight: var(--fw-regular);
			font-size: var(--text-base-lg);
			letter-spacing: normal;
		}
	}

	.overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0, 0.35);
		top: 0;
		left: 0;
	}

	.overlay--linear {
		background: linear-gradient(to right, rgba(0, 0, 0, 0.3) 40%, transparent);
	}

	h1,
	h5 {
		color: var(--color-white);
	}
</style>
