<script lang="ts">
	import { writable } from "svelte/store";
	import { getScrollAreaCtx, setScrollbarCtx, type Orientation } from "../ctx.js";
	import { onDestroy } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import ScrollAreaScrollbarVisible from "./scroll-area-scrollbar-visible.svelte";
	import ScrollAreaScrollbarAuto from "./scroll-area-scrollbar-auto.svelte";

	type $$Props = {
		orientation?: "vertical" | "horizontal";
	} & HTMLAttributes<HTMLElement>;

	export let orientation: Orientation = "vertical";

	const rootCtx = getScrollAreaCtx();
	const { type, scrollbarXEnabled, scrollbarYEnabled } = rootCtx;

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
	<slot />
{:else if $type === "scroll"}
	<slot />
{:else if $type === "auto"}
	<ScrollAreaScrollbarAuto {...$$restProps}>
		<slot />
	</ScrollAreaScrollbarAuto>
{:else if $type === "always"}
	<ScrollAreaScrollbarVisible data-state="visible" {...$$restProps}>
		<slot />
	</ScrollAreaScrollbarVisible>
{/if}
