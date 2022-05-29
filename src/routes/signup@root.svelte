<script lang="ts">
	import AuthTopbar from '$lib/components/auth/AuthTopbar.svelte';
	import ImageSlider from '$lib/components/auth/ImageSlider.svelte';
	import PasswordStrength from '$lib/components/auth/PasswordStrength.svelte';
	import Button from '$lib/components/global/Button.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';

	let password: string;
</script>

<main class="grid">
	<div class="login">
		<AuthTopbar createAction={false} />

		<div class="form-wrap">
			<form class="form" action="">
				<h2>Sign up</h2>
				<div class="form__col">
					<TextInput type="text" placeholder="first name" name="" />
					<TextInput type="text" placeholder="Last name" name="" />
				</div>
				<TextInput type="text" placeholder="email" name="" />
				<TextInput type="text" placeholder="password" name="" bind:value={password} />
				<PasswordStrength {password} />
				<Button width="100%">Register</Button>
				<span class="forgot">Have an account? <a class="link" href="/forgot">Log in</a></span>
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
	}

	.form,
	.form__col {
		gap: var(--space-xs);
	}

	.form {
		flex-direction: column;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		height: 100%;

		&__col {
			display: flex;
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
