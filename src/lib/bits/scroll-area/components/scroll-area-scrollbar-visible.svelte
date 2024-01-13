<script lang="ts" context="module">
	import type { HTMLAttributes } from "svelte/elements";
	export type ScrollbarVisibleProps = HTMLAttributes<HTMLElement> & {
		el?: HTMLElement;
	};
</script>

<script lang="ts">
	import { derived, writable } from "svelte/store";
	import {
		getScrollbarCtx,
		getScrollAreaCtx,
		setScrollbarVisibleCtx,
		type Sizes,
		type Direction
	} from "../ctx.js";
	import {
		getThumbRatio,
		isScrollingWithinScrollbarBounds,
		getScrollPositionFromPointer,
		getThumbOffsetFromScroll
	} from "../utils.js";
	import ScrollAreaScrollbarX from "./scroll-area-scrollbar-x.svelte";
	import ScrollAreaScrollbarY from "./scroll-area-scrollbar-y.svelte";
	import { onMount } from "svelte";

	type $$Props = ScrollbarVisibleProps;

	export let el: HTMLElement | undefined = undefined;

	const rootCtx = getScrollAreaCtx();
	const { viewportElement, dir } = rootCtx;

	const scrollbarCtx = getScrollbarCtx();
	const { isHorizontal } = scrollbarCtx;

	const sizes = writable<Sizes>({
		content: 0,
		viewport: 0,
		scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
	});

	const hasThumb = derived(sizes, ($sizes) => {
		const thumbRatio = getThumbRatio($sizes.viewport, $sizes.content);
		return thumbRatio > 0 && thumbRatio < 1;
	});

	const thumbElement = writable<HTMLElement>();
	const pointerOffset = writable(0);

	function handleWheelScroll(e: WheelEvent, payload: number) {
		console.log("handling wheel scroll");
		if (!$viewportElement) return;
		if ($isHorizontal) {
			const scrollPos = $viewportElement.scrollLeft + e.deltaY;
			$viewportElement.scrollLeft = scrollPos;
			// prevent window scroll when wheeling on scrollbar
			if (isScrollingWithinScrollbarBounds(scrollPos, payload)) {
				e.preventDefault();
			}
		} else {
			const scrollPos = $viewportElement.scrollTop + e.deltaY;
			$viewportElement.scrollTop = scrollPos;
			// prevent window scroll when wheeling on scrollbar
			if (isScrollingWithinScrollbarBounds(scrollPos, payload)) {
				e.preventDefault();
			}
		}
	}

	function handleThumbDown(_: MouseEvent, payload: { x: number; y: number }) {
		if ($isHorizontal) {
			pointerOffset.set(payload.x);
		} else {
			pointerOffset.set(payload.y);
		}
	}

	function handleThumbUp(_: MouseEvent) {
		pointerOffset.set(0);
	}

	function handleSizeChange(payload: Sizes) {
		sizes.set(payload);
	}

	function getScrollPosition(pointerPos: number, dir?: Direction) {
		return getScrollPositionFromPointer(pointerPos, $pointerOffset, $sizes, dir);
	}

	function onDragScroll(payload: number) {
		if (!$viewportElement) return;
		if ($isHorizontal) {
			$viewportElement.scrollLeft = getScrollPosition(payload, $dir);
		} else {
			$viewportElement.scrollTop = getScrollPosition(payload);
		}
	}

	function onThumbPositionChange() {
		if (!$viewportElement || !$thumbElement) return;
		if ($isHorizontal) {
			const scrollPos = $viewportElement.scrollLeft;
			const offset = getThumbOffsetFromScroll(scrollPos, $sizes, $dir);
			$thumbElement.style.transform = `translate3d(${offset}px, 0, 0)`;
		} else {
			const scrollPos = $viewportElement.scrollTop;
			const offset = getThumbOffsetFromScroll(scrollPos, $sizes);
			$thumbElement.style.transform = `translate3d(0, ${offset}px, 0)`;
		}
	}

	function onThumbChange(element: HTMLElement) {
		thumbElement.set(element);
	}

	setScrollbarVisibleCtx({
		sizes,
		hasThumb,
		handleWheelScroll,
		handleThumbDown,
		handleThumbUp,
		handleSizeChange,
		onDragScroll,
		onThumbPositionChange,
		onThumbChange
	});
</script>

{#if $isHorizontal}
	<ScrollAreaScrollbarX {...$$restProps} bind:el>
		<slot />
	</ScrollAreaScrollbarX>
{:else}
	<ScrollAreaScrollbarY {...$$restProps} bind:el>
		<slot />
	</ScrollAreaScrollbarY>
{/if}
