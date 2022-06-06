<script lang="ts">
	import Icon from '@iconify/svelte';
	import EmailSubscribe from './EmailSubscribe.svelte';

	const socialIconSize = 25;
</script>

<footer class="footer">
	<div class="footer__fadeout" />

	<div class="contact-section">
		<EmailSubscribe />
	</div>

	<div class="container">
		<header>
			<h2>DMT</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempor luctus et faucibus senectus
				id. Vitae arcu sed proin mauris sit eget et. Pharetra ipsum arcu est nunc cras faucibus.
			</p>
		</header>

		<div class="bottom">
			<nav class="nav">
				<div class="nav__block">
					<h4>Company</h4>
					<a href="/">About</a>
					<a href="/">Carrers</a>
					<a href="/">Affiliates</a>
					<a href="/">Media center</a>
				</div>

				<div class="nav__block">
					<h4>Explore DMT</h4>
					<a href="/">Become a partner</a>
					<a href="/">Book a vacation</a>
					<a href="/">Trust & satety</a>
					<a href="/">Vactaion guides</a>
				</div>
			</nav>

			<div class="contact">
				<p>Support: <a href="tel:4079246902">407 924 6902</a></p>
				<p>Email: <a href="mailto:adam@webrevived.com">adam@webrevived.com</a></p>

				<div class="contact__icons">
					<Icon
						icon="akar-icons:facebook-fill"
						color="var(--color-white)"
						width={socialIconSize}
						height={socialIconSize}
					/>
					<Icon
						icon="akar-icons:instagram-fill"
						color="var(--color-white)"
						width={socialIconSize}
						height={socialIconSize}
					/>
					<Icon
						icon="akar-icons:twitter-fill"
						color="var(--color-white)"
						width={socialIconSize}
						height={socialIconSize}
					/>
				</div>
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	.footer {
		background-image: url('/images/global/ocean_footer.png');
		// background-attachment: fixed;
		background-size: cover;
		height: 100vh;
		position: relative;
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		padding-bottom: var(--space-md);

		&__fadeout {
			position: absolute;
			top: 0;
			background: linear-gradient(to bottom, var(--color-white) 15%, transparent 55%);
			height: 100%;
			width: 100%;
		}
	}
	.bottom {
		display: flex;
		justify-content: space-between;
	}
	.nav {
		display: flex;
		gap: var(--space-3xl);

		&__block {
			display: flex;
			flex-direction: column;
			gap: var(--space-xs);
		}

		a {
			font-weight: var(--fw-light);
		}
	}
	.contact {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);

		a {
			text-decoration: underline;
		}

		&__icons {
			display: flex;
			gap: var(--space-lg);
		}
	}
	.contact-section {
		display: flex;
		justify-content: center;
		position: absolute;
		top: var(--space-4xl);
		width: 100%;
		left: 50%;
		z-index: 1;
		transform: translateX(-50%);
	}
	header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin: 0 auto;
		max-width: 43ch;
		text-align: center;
		margin-bottom: var(--space-5xl);

		p {
			line-height: var(--line-md);
		}
	}
	.container {
		position: relative;
		color: var(--color-white);

		p {
			color: var(--color-white);
		}
	}
	h4,
	h2 {
		color: var(--color-white);
	}

	@media screen and (max-width: 597px) {
		.footer {
			height: 100vh;

			&__fadeout {
				background: linear-gradient(to bottom, var(--color-white) 5%, rgba(0, 0, 0, 0.158) 55%);
				height: 100%;
				width: 100%;
			}
		}
		.bottom {
			flex-direction: column;
			align-items: center;
			gap: var(--space-xl);
		}
		.contact {
			text-align: center;
			gap: var(--space-sm);
			align-items: center;
		}
	}
</style>
