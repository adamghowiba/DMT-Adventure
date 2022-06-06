<script lang="ts">
	import AuthTopbar from '$lib/components/auth/AuthTopbar.svelte';
	import Button from '$lib/components/global/Button.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';
	</script>

<main class="main">
	<div class="container">
		<AuthTopbar createAction={false} />
	</div>

	<form class="login" action="">
		<header>
			<h2>Forgot Password</h2>
			<p>Enter your email below to reset your password</p>
		</header>
		<TextInput type="text" placeholder="email" name="" />
		<Button width="100%">Submit</Button>
	</form>
</main>

<style lang="scss">
	.main {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	h2 {
		font-weight: var(--fw-semi-bold);
	}
	header {
		display: flex;
		text-align: center;
		flex-direction: column;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
		width: 100%;
		max-width: 400px;
		margin: auto 0;
		align-self: center;
	}
</style>
