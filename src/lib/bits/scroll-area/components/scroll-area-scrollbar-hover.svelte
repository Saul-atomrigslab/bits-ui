<script lang="ts">
	import type { ScrollbarVisibleProps } from "./scroll-area-scrollbar-visible.svelte";
	import ScrollAreaScrollbarAuto from "./scroll-area-scrollbar-auto.svelte";
	import { getScrollAreaCtx } from "../ctx.js";
	import { onMount } from "svelte";
	import { addEventListener, executeCallbacks } from "$lib/internal/index.js";

	type $$Props = ScrollbarVisibleProps;

	const rootCtx = getScrollAreaCtx();
	const { scrollHideDelay, scrollAreaElement } = rootCtx;

	let timeout: ReturnType<typeof setTimeout> | undefined | number;
	let visible = false;

	function handlePointerEnter() {
		window.clearTimeout(timeout);
		visible = true;
	}

	function handlePointerLeave() {
		timeout = window.setTimeout(() => {
			visible = false;
		}, $scrollHideDelay);
	}

	onMount(() => {
		let unsubEvents = () => {};
		if ($scrollAreaElement) {
			unsubEvents = executeCallbacks(
				addEventListener($scrollAreaElement, "pointerenter", handlePointerEnter),
				addEventListener($scrollAreaElement, "pointerleave", handlePointerLeave)
			);
		}

		return () => {
			unsubEvents();
		};
	});
</script>

{#if visible}
	<ScrollAreaScrollbarAuto {...$$restProps} data-state={visible ? "visible" : "hidden"}>
		<slot />
	</ScrollAreaScrollbarAuto>
{/if}
