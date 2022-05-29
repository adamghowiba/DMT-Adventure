<script lang="ts">
	import AuthTopbar from '$lib/components/auth/AuthTopbar.svelte';
	import ImageSlider from '$lib/components/auth/ImageSlider.svelte';
	import Button from '$lib/components/global/Button.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';
</script>

<main class="grid">
	<div class="login">
		<AuthTopbar />

		<div class="form-wrap">
			<form action="">
				<h2>Log in</h2>
				<TextInput type="text" placeholder="email" name="" />
				<TextInput type="text" placeholder="password" name="" />
				<Button width="100%">Login</Button>
				<span class="forgot"
					>Forgot password? <a class="link" href="/forgot">Reset Password</a></span
				>
			</form>
		</div>
	</div>

	<div class="slider">
		<ImageSlider />
	</div>
</main>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: 50% 50%;
		height: 100%;
	}

	.login {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: var(--space-md);

		form {
			flex-direction: column;
			width: 100%;
			display: flex;
			gap: var(--space-sm);
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			height: 100%;
		}
	}

	.form-wrap {
		align-items: center;
		height: 100%;
		width: 100%;
		max-width: 450px;
		margin: 0 auto;
	}

	.link {
		color: var(--color-primary);
	}
	.forgot {
		color: var(--color-gray-muted);
	}

	@media screen and (max-width: 768px) {
		.grid {
			grid-template-columns: 1fr;
		}
		.slider {
			display: none;
		}
	}
</style>
