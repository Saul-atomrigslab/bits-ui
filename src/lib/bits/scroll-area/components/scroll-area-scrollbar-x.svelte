<script lang="ts">
	import ScrollAreaScrollbarImpl from "./scroll-area-scrollbar-impl.svelte";
	import { getScrollAreaCtx, getScrollbarVisibleCtx } from "../ctx.js";
	import { getThumbSize } from "../utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	type $$Props = HTMLAttributes<HTMLElement> & {
		el?: HTMLElement;
	};

	export let el: HTMLElement | undefined = undefined;

	const rootCtx = getScrollAreaCtx();
	const { scrollbarXElement } = rootCtx;
	const { dir } = rootCtx;
	const scrollbarVisibleCtx = getScrollbarVisibleCtx();
	const { sizes } = scrollbarVisibleCtx;

	$: el = $scrollbarXElement;
</script>

<ScrollAreaScrollbarImpl
	bind:el={$scrollbarXElement}
	isHorizontal
	data-orientation="horizontal"
	{...$$restProps}
	style={{
		bottom: 0,
		left: $dir === "rtl" ? "var(--bits-scroll-area-corner-width)" : 0,
		right: $dir === "ltr" ? "var(--bits-scroll-area-corner-width)" : 0,
		"--bits-scroll-area-thumb-width": $sizes ? `${getThumbSize($sizes)}px` : undefined
	}}
	on:dragscroll={(e) => scrollbarVisibleCtx.onDragScroll(e.detail.x)}
>
	<slot />
</ScrollAreaScrollbarImpl>
