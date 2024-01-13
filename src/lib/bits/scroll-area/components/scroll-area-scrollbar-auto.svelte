<script lang="ts">
	import { getScrollAreaCtx, getScrollbarCtx } from "../ctx.js";
	import type { ScrollbarVisibleProps } from "./scroll-area-scrollbar-visible.svelte";
	import ScrollAreaScrollbarVisible from "./scroll-area-scrollbar-visible.svelte";
	import { onMount } from "svelte";
	import { debounceCallback } from "../utils.js";
	import { resizeObserver } from "../actions.js";

	const rootCtx = getScrollAreaCtx();
	const scrollbarCtx = getScrollbarCtx();

	const { viewportElement, contentElement } = rootCtx;
	const { isHorizontal } = scrollbarCtx;

	let visible = false;

	type $$Props = ScrollbarVisibleProps;

	const handleResize = debounceCallback(() => {
		if (!$viewportElement) return;

		const isOverflowX = $viewportElement.offsetWidth < $viewportElement.scrollWidth;
		const isOverflowY = $viewportElement.offsetHeight < $viewportElement.scrollHeight;

		visible = $isHorizontal ? isOverflowX : isOverflowY;
	}, 10);

	onMount(() => {
		handleResize();
		let unsubViewportResize = () => {};
		let unsubContentResize = () => {};

		if ($viewportElement) {
			unsubViewportResize = resizeObserver($viewportElement, {
				handleSizeChange: handleResize
			}).destroy;
		}
		if ($contentElement) {
			unsubContentResize = resizeObserver($contentElement, {
				handleSizeChange: handleResize
			}).destroy;
		}

		return () => {
			unsubViewportResize();
			unsubContentResize();
		};
	});
</script>

{#if visible}
	<ScrollAreaScrollbarVisible data-state={visible ? "visible" : "hidden"} {...$$restProps}>
		<slot />
	</ScrollAreaScrollbarVisible>
{/if}
