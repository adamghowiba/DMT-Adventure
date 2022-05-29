<script lang="ts">
	import Button from '$lib/components/global/Button.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';
	import ProfileGroup from './ProfileGroup.svelte';
	import ProfileWrapper from './ProfileWrapper.svelte';
</script>

<ProfileWrapper title="Settings">
	<ProfileGroup title="Change your password">
		<div class="group">
			<TextInput placeholder="old password" value="" name="email" />
			<TextInput placeholder="new password" value="" name="email" />
			<TextInput placeholder="confirm password" value="" name="email" />

			<p>
				Note: Your password must be between 7 and 32 characters and contain at least one letter and
				one number.
			</p>

			<Button>Update password</Button>
		</div>
	</ProfileGroup>
</ProfileWrapper>

<style lang="scss">
	.group {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
</style>
