<script lang="ts">
	import { getScrollAreaCtx } from "../ctx.js";
	import ScrollAreaCornerImpl from "./scroll-area-corner-impl.svelte";
	import type { HTMLAttributes } from "svelte/elements";

	const rootCtx = getScrollAreaCtx();
	const { scrollbarXElement, scrollbarYElement, type } = rootCtx;

	type $$Props = HTMLAttributes<HTMLElement>;

	$: hasBothScrollbarsVisible = !!$scrollbarXElement && !!$scrollbarYElement;
	$: hasCorner = $type !== "scroll" && hasBothScrollbarsVisible;
</script>

{#if hasCorner}
	<ScrollAreaCornerImpl {...$$restProps}>
		<slot />
	</ScrollAreaCornerImpl>
{/if}
