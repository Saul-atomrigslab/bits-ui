<script lang="ts">
	import { getScrollAreaCtx } from "../ctx.js";
	import { resizeObserver } from "../actions.js";
	import { noop, styleToString } from "$lib/internal/index.js";
	import { onMount } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type $$Props = HTMLAttributes<HTMLElement>;

	const rootCtx = getScrollAreaCtx();
	const { scrollbarXElement, scrollbarYElement, dir } = rootCtx;

	let width = 0;
	let height = 0;

	$: hasSize = !!width && !!height;

	function setCornerHeight() {
		const offsetHeight = $scrollbarXElement?.offsetHeight || 0;
		rootCtx.cornerHeight.set(offsetHeight);
		height = offsetHeight;
	}

	function setCornerWidth() {
		const offsetWidth = $scrollbarYElement?.offsetWidth || 0;
		rootCtx.cornerWidth.set(offsetWidth);
		width = offsetWidth;
	}

	onMount(() => {
		let unsubX = noop;
		let unsubY = noop;

		if ($scrollbarXElement) {
			unsubX = resizeObserver($scrollbarXElement, { handleSizeChange: setCornerHeight }).destroy;
		}
		if ($scrollbarYElement) {
			unsubY = resizeObserver($scrollbarYElement, { handleSizeChange: setCornerWidth }).destroy;
		}

		return () => {
			unsubX();
			unsubY();
		};
	});

	$: if ($scrollbarXElement) {
		setCornerHeight();
	}

	$: if ($scrollbarYElement) {
		setCornerWidth();
	}
</script>

{#if hasSize}
	<div
		style={styleToString({
			width: `${width}px`,
			height: `${height}px`,
			position: "absolute",
			right: $dir === "ltr" ? 0 : undefined,
			left: $dir === "rtl" ? 0 : undefined,
			bottom: 0
		})}
	>
		<slot />
	</div>
{/if}
