<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { getScrollAreaCtx } from "../ctx.js";
	import { styleToString } from "$lib/internal/index.js";

	type $$Props = HTMLAttributes<HTMLElement>;

	const rootCtx = getScrollAreaCtx();
	const { viewportElement, contentElement, scrollbarXEnabled, scrollbarYEnabled } = rootCtx;
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	bind:this={$viewportElement}
	data-bits-scroll-area-viewport=""
	style={styleToString({
		"overflow-x": $scrollbarXEnabled ? "scroll" : "hidden",
		"overflow-y": $scrollbarYEnabled ? "scroll" : "hidden"
	})}
	tabindex={0}
>
	<div
		bind:this={$contentElement}
		data-bits-scroll-area-content=""
		style={styleToString({
			"min-width": "100%",
			display: "table"
		})}
		{...$$restProps}
	>
		<slot />
	</div>
</div>

<style>
	/* Hide scrollbars cross-browser & enable momentum for touch devices */
	:global([data-bits-scroll-area-viewport]) {
		scrollbar-width: none;
		-ms-overflow-style: none;
		-webkit-overflow-scrolling: touch;
	}

	:global([data-bits-scroll-area-viewport]::-webkit-scrollbar) {
		display: none;
	}
</style>
