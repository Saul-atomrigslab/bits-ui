<script lang="ts">
	import ScrollAreaScrollbarImpl from "./scroll-area-scrollbar-impl.svelte";
	import { getScrollAreaCtx, getScrollbarVisibleCtx } from "../ctx.js";
	import { getThumbSize } from "../utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	type $$Props = HTMLAttributes<HTMLElement>;

	const rootCtx = getScrollAreaCtx();
	const { scrollbarYElement } = rootCtx;
	const { dir } = rootCtx;
	const scrollbarVisibleCtx = getScrollbarVisibleCtx();
	const { sizes } = scrollbarVisibleCtx;
</script>

<ScrollAreaScrollbarImpl
	bind:el={$scrollbarYElement}
	isHorizontal={false}
	data-orientation="vertical"
	{...$$restProps}
	style={{
		top: 0,
		right: $dir === "ltr" ? 0 : undefined,
		left: $dir === "rtl" ? 0 : undefined,
		bottom: "var(--bits-scroll-area-corner-height)",
		"--bits-scroll-area-thumb-height": $sizes ? `${getThumbSize($sizes)}px` : undefined
	}}
	on:dragscroll={(e) => scrollbarVisibleCtx.onDragScroll(e.detail.y)}
>
	<slot />
</ScrollAreaScrollbarImpl>
