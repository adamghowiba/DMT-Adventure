<script lang="ts">
	import TextInput from '$lib/components/input/TextInput.svelte';
	import ProfileGroup from './ProfileGroup.svelte';
	import ProfileWrapper from './ProfileWrapper.svelte';
</script>

<ProfileWrapper title="Profile">
	<ProfileGroup title="Basics">
		<TextInput placeholder="first name" value="" name="email" />
		<TextInput placeholder="last name" value="" name="email" />
	</ProfileGroup>

	<ProfileGroup title="Home location">
		<TextInput placeholder="(City, country)" value="" name="email" />
	</ProfileGroup>

	<ProfileGroup title="Contact">
		<TextInput placeholder="Email address" value="" name="email" />
		<TextInput placeholder="Phone number" value="" name="email" />
	</ProfileGroup>
</ProfileWrapper>

<style lang="scss">
</style>
