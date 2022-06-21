<script lang="ts">
	import ContactCheckbox from './ContactCheckbox.svelte';

	export let checkboxs = [
		'Travel Planning',
		'Rental vehicle',
		'Airport transportation',
		'Trekking Info',
		'Tour Guides',
		'Hotel support'
	];
	export let selected: string[] = [];

	const handleCheckboxSelect = (name: string) => {
		const includesIndex = selected.indexOf(name);

		if (includesIndex > -1) return (selected = selected.filter((item) => item !== name));
		selected = [...selected, name];
	};

	$: console.log(selected);
</script>

<section class="section--sm">
    <h3>Services Needed</h3>

	<div class="checkboxs">
		{#each checkboxs as name, i}
			<button on:click={() => handleCheckboxSelect(name)}>
				<ContactCheckbox {name} checked={selected.includes(name)} />
			</button>
		{/each}
	</div>
</section>

<style lang="scss">
	button {
		appearance: none;
		border: none;
		outline: none;
		width: 100%;
	}

	.checkboxs {
		gap: var(--space-xs);
		display: grid;
		justify-items: center;
		grid-template-columns: repeat(3, 1fr);
	}
    section {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
    }
</style>
