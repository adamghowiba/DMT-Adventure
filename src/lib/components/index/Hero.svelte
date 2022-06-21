<script lang="ts">
	import SearchBar from '../../components/searchbar/SearchBar.svelte';

	export let imgSrc: string;
	export let title: string;
	export let subtitle: string;
</script>

<section class="hero">
	<!-- Image & Overlay -->
	<img class="hero__image" src={imgSrc} alt="Looking out over ocean with clear blue waters" />
	<div class="overlay overlay--linear" />

	<header class="container">
		<div class="text">
			<h1 class="title">It's time to</h1>
			<h1 class="title title--subtitle">Discover</h1>
		</div>
		<h5>{subtitle}</h5>
	</header>
	<div class="container">
		<div class="search">
			<SearchBar searchButton />
		</div>
	</div>
</section>

<style lang="scss">
	.search {
		position: absolute;
		bottom: 0;
		transform: translateY(50%);
		background-color: var(--color-offwhite);
		padding: var(--space-lg) var(--space-md);
		border-radius: 3px;
		box-shadow: var(--shadow-image);
		z-index: 200;
	}

	.container {
		display: flex;
		justify-content: center;
		position: relative;
	}

	.hero {
		position: relative;
		min-height: 75vh;
		height: 550px;
		margin-bottom: var(--space-4xl);

		&__image {
			position: absolute;
			width: 100%;
			height: 100%;
			object-position: center;
			object-fit: cover;
		}
	}

	header {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: var(--space-sm);
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

		.text {
			display: flex;
			flex-direction: column;
			gap: var(--space-2xs);
		}

		.title {
			font-size: 60px;
			font-weight: var(--fw-light);
		}

		.title--subtitle {
			font-weight: var(--fw-bold);
		}
	}

	.overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.055);
		top: 0;
		left: 0;
	}

	.overlay--linear {
		background: linear-gradient(to right, rgba(0, 0, 0, 0.18) 40%, transparent);
	}

	h1,
	h5 {
		color: var(--color-white);
	}

	@media only screen and (max-width: 1024px) {
		.search {
			width: 95%;
		}
	}

	@media only screen and (max-width: 768px) {
		.search {
			padding: var(--space-2xs);
		}
	}

	@media only screen and (max-width: 425px) {
		.search {
			width: 100%;
		}
		header {
			.title {
				font-size: 45px;
			}
		}
	}
</style>
