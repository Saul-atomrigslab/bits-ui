<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { getScrollAreaCtx, getScrollbarVisibleCtx } from "../ctx.js";
	import { isHTMLElement, noop, addEventListener, styleToString } from "$lib/internal/index.js";
	import { addUnlinkedScrollListener } from "../utils.js";

	type $$Props = HTMLAttributes<HTMLElement>;

	const rootCtx = getScrollAreaCtx();
	const { viewportElement } = rootCtx;
	const scrollbarVisibleCtx = getScrollbarVisibleCtx();
	const { hasThumb } = scrollbarVisibleCtx;

	function handlePointerDown(e: MouseEvent) {
		const thumb = e.target;
		if (!isHTMLElement(thumb)) return;
		const thumbRect = thumb.getBoundingClientRect();
		const x = e.clientX - thumbRect.left;
		const y = e.clientY - thumbRect.top;
		scrollbarVisibleCtx.handleThumbDown(e, { x, y });
	}

	function handlePointerUp(e: MouseEvent) {
		scrollbarVisibleCtx.handleThumbUp(e);
	}

	let removeUnlinkedScrollListener: (() => void) | undefined;

	function handleScroll() {
		if (removeUnlinkedScrollListener) return;
		removeUnlinkedScrollListener = addUnlinkedScrollListener($viewportElement!);
		scrollbarVisibleCtx.onThumbPositionChange;
		scrollbarVisibleCtx.onThumbPositionChange();
	}

	function thumbAction(node: HTMLElement) {
		scrollbarVisibleCtx.onThumbChange(node);
		let unsub = noop;
		if ($viewportElement) {
			scrollbarVisibleCtx.onThumbPositionChange();
			unsub = addEventListener($viewportElement, "scroll", handleScroll);
		}

		return {
			destroy: unsub
		};
	}
</script>

<div
	use:thumbAction
	{...$$restProps}
	data-state={$hasThumb ? "visible" : "hidden"}
	style={styleToString({
		width: "var(--bits-scroll-area-thumb-width)",
		heigth: "var(--bits-scroll-area-thumb-height)"
	})}
	on:pointerdown={handlePointerDown}
	on:pointerup={handlePointerUp}
>
	<slot />
</div>
