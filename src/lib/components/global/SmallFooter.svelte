<script lang="ts">
	import Icon from '@iconify/svelte';

	const socialIconSize = 20;
	const socialIconColor = 'var(--color-text-body)';
</script>

<section>
	<footer class="container">
		<div class="links">
			<span>© 2022 DMT Adventure, LLC.</span>
			<a href="/">Privacy</a>
			<a href="/">Terms</a>
			<a href="/">Home</a>
		</div>

		<div class="social">
			<Icon
				icon="akar-icons:facebook-fill"
				color={socialIconColor}
				width={socialIconSize}
				height={socialIconSize}
			/>
			<Icon
				icon="akar-icons:instagram-fill"
				color={socialIconColor}
				width={socialIconSize}
				height={socialIconSize}
			/>
			<Icon
				icon="akar-icons:twitter-fill"
				color={socialIconColor}
				width={socialIconSize}
				height={socialIconSize}
			/>
		</div>
	</footer>
</section>

<style lang="scss">
	section {
		height: 68px;
		background-color: #f7f7f7;
		border-top: 1px solid var(--color-trans);
	}
	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}
	.links {
		display: flex;

		&,
		a,
		span {
			gap: var(--space-2xs);
		}

		a,
		span {
			display: flex;
			align-items: center;
		}

		a:not(:last-child):after,
		span:not(:last-child):after {
			content: '';
			display: block;
			width: 2.5px;
			height: 2.5px;
			background-color: var(--color-text-body);
		}
	}
	.social {
		display: flex;
		gap: var(--space-sm);
	}
</style>
