<script lang="ts">
	import { writable } from "svelte/store";
	import { getScrollAreaCtx, setScrollbarCtx, type Orientation } from "../ctx.js";
	import { onDestroy } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import ScrollAreaScrollbarVisible from "./scroll-area-scrollbar-visible.svelte";
	import ScrollAreaScrollbarAuto from "./scroll-area-scrollbar-auto.svelte";
	import ScrollAreaScrollbarHover from "./scroll-area-scrollbar-hover.svelte";
	import ScrollAreaScrollbarScroll from "./scroll-area-scrollbar-scroll.svelte";

	type $$Props = {
		orientation?: "vertical" | "horizontal";
		el?: HTMLElement | undefined;
	} & HTMLAttributes<HTMLElement>;

	export let orientation: Orientation = "vertical";

	const rootCtx = getScrollAreaCtx();
	const { type, scrollbarXEnabled, scrollbarYEnabled } = rootCtx;

	export let el: HTMLElement | undefined = undefined;

	const isHorizontal = writable(orientation === "horizontal");
	const orientationStore = writable(orientation);

	$: isHorizontal.set(orientation === "horizontal");

	$: {
		if ($isHorizontal) {
			scrollbarXEnabled.set(true);
		} else {
			scrollbarYEnabled.set(true);
		}
	}

	onDestroy(() => {
		scrollbarXEnabled.set(false);
		scrollbarYEnabled.set(false);
	});

	setScrollbarCtx({
		orientation: orientationStore,
		isHorizontal
	});
</script>

{#if $type === "hover"}
	<ScrollAreaScrollbarHover {...$$restProps} bind:el>
		<slot />
	</ScrollAreaScrollbarHover>
{:else if $type === "scroll"}
	<ScrollAreaScrollbarScroll {...$$restProps} bind:el>
		<slot />
	</ScrollAreaScrollbarScroll>
{:else if $type === "auto"}
	<ScrollAreaScrollbarAuto {...$$restProps} bind:el>
		<slot />
	</ScrollAreaScrollbarAuto>
{:else if $type === "always"}
	<ScrollAreaScrollbarVisible data-state="visible" {...$$restProps} bind:el>
		<slot />
	</ScrollAreaScrollbarVisible>
{/if}
