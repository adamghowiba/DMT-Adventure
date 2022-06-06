<script lang="ts">
	import TextInput from '$lib/components/input/TextInput.svelte';
import type { Address } from '$lib/types/listing';
	import type { User } from '$lib/types/user';
	import ProfileGroup from './ProfileGroup.svelte';
	import ProfileWrapper from './ProfileWrapper.svelte';

	export let user: User;
	let homeAddressValue: string | undefined = '';
	
	const transformHomeAddress =(address: Address | undefined) => {
		if (!address) return;

		return `${address.street} ${address.city} ${address.state}, ${address.zip}`
	}

	homeAddressValue = transformHomeAddress(user.home);

</script>

<ProfileWrapper title="Profile">
	<ProfileGroup title="Basics">
		<TextInput placeholder="first name" bind:value={user.firstName} name="firstName" />
		<TextInput placeholder="last name" bind:value={user.lastName} name="lastName" />
	</ProfileGroup>

	<ProfileGroup title="Home location">
		<TextInput placeholder="(City, country)" bind:value={homeAddressValue} name="home" />
	</ProfileGroup>

	<ProfileGroup title="Contact">
		<TextInput placeholder="Email address" bind:value={user.email} name="email" />
		<TextInput placeholder="Phone number" bind:value={user.phone} name="phone" />
	</ProfileGroup>
</ProfileWrapper>

<style lang="scss">
</style>
