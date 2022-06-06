<script lang="ts">
	import { onMount } from 'svelte';

	let wrapperElement: HTMLElement;
    let blockElement: HTMLElement;

	const handleTouch = (event: TouchEvent) => {
        const screenX = event.touches[0].clientX;

        console.log(screenX);
        blockElement.style.transform = `translateX(${screenX}px)`
    };

	onMount(() => {
		wrapperElement.addEventListener('touchmove', handleTouch);

		return () => {
			wrapperElement.removeEventListener('touchmove', handleTouch);
		};
	});
</script>

<div class="wrapper" bind:this={wrapperElement}>
	<div class="block" bind:this={blockElement} />
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		align-items: center;
		padding: 20px;
		height: 200px;
		position: relative;
	}
	.block {
		position: absolute;
		width: 100px;
		height: 100px;
		background-color: coral;
        top: 50%;
        transform: translateY(-50%);

        transition: transform 0.055s linear;
	}
</style>
