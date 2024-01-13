<script lang="ts">
	import { writable } from "svelte/store";
	import { getScrollAreaCtx, getScrollbarVisibleCtx } from "../ctx.js";
	import { toInt } from "../utils.js";
	import { createEventDispatcher, onMount } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { type StyleRecord, styleToString } from "$lib/internal/style.js";
	import { isHTMLElement } from "$lib/internal/is.js";
	import { addEventListener } from "$lib/internal/events.js";
	import { resizeObserver } from "../actions.js";

	type $$Props = {
		isHorizontal: boolean;
		style: StyleRecord;
		el: HTMLElement | undefined;
	} & Omit<HTMLAttributes<HTMLDivElement>, "style">;

	type $$Events = {
		dragscroll: CustomEvent<{ x: number; y: number }>;
	};

	export let isHorizontal: boolean;
	export let style: StyleRecord = {};

	export let el: HTMLElement | undefined;

	const rootCtx = getScrollAreaCtx();
	const { viewportElement, contentElement } = rootCtx;
	const scrollbarVisibleCtx = getScrollbarVisibleCtx();
	const { sizes } = scrollbarVisibleCtx;

	const dispatch = createEventDispatcher();

	const prevWebkitUserSelect = writable("");
	const rect = writable<DOMRect | undefined>();

	function handleDragScroll(e: MouseEvent) {
		if (!$rect) return;
		const x = e.clientX - $rect.left;
		const y = e.clientY - $rect.top;
		dispatch("dragscroll", { x, y });
	}

	function handlePointerDown(e: PointerEvent) {
		if (e.button !== 0) return;
		const element = e.target;
		if (!isHTMLElement(element)) return;
		element.setPointerCapture(e.pointerId);
		$rect = el!.getBoundingClientRect();

		$prevWebkitUserSelect = document.body.style.webkitUserSelect;
		document.body.style.webkitUserSelect = "none";
		if ($viewportElement) {
			$viewportElement.style.scrollBehavior = "auto";
		}
		handleDragScroll(e);
	}

	function handlePointerMove(e: PointerEvent) {
		handleDragScroll(e);
	}

	function handlePointerUp(e: PointerEvent) {
		const element = e.target;
		if (!isHTMLElement(element)) return;
		if (element.hasPointerCapture(e.pointerId)) {
			element.releasePointerCapture(e.pointerId);
		}

		document.body.style.webkitUserSelect = $prevWebkitUserSelect;
		if ($viewportElement) {
			$viewportElement.style.scrollBehavior = "";
		}
		$rect = undefined;
	}

	function handleWheel(e: WheelEvent) {
		const element = e.target;
		if (!isHTMLElement(element)) return;
		const isScrollbarWheel = el?.contains(element);
		const maxScrollPos = $sizes.content - $sizes.viewport;
		if (isScrollbarWheel) {
			scrollbarVisibleCtx.handleWheelScroll(e, maxScrollPos);
		}
	}

	onMount(() => {
		const unsubWheel = addEventListener(document, "wheel", handleWheel, {
			passive: false
		});
		let unsubContentResize = () => {};
		if ($contentElement) {
			unsubContentResize = resizeObserver($contentElement, {
				handleSizeChange
			}).destroy;
		}

		return () => {
			unsubWheel();
			unsubContentResize();
		};
	});

	function handleSizeChange() {
		if (!el) return;
		if (isHorizontal) {
			scrollbarVisibleCtx.handleSizeChange({
				content: $viewportElement?.scrollWidth ?? 0,
				viewport: $viewportElement?.offsetWidth ?? 0,
				scrollbar: {
					size: el.clientWidth ?? 0,
					paddingStart: toInt(getComputedStyle(el).paddingLeft),
					paddingEnd: toInt(getComputedStyle(el).paddingRight)
				}
			});
		} else {
			scrollbarVisibleCtx.handleSizeChange({
				content: $viewportElement?.scrollHeight ?? 0,
				viewport: $viewportElement?.offsetHeight ?? 0,
				scrollbar: {
					size: el.clientHeight ?? 0,
					paddingStart: toInt(getComputedStyle(el).paddingLeft),
					paddingEnd: toInt(getComputedStyle(el).paddingRight)
				}
			});
		}
	}
</script>

<div
	bind:this={el}
	data-scrollbarimpl
	use:resizeObserver={{ handleSizeChange }}
	on:pointerdown={handlePointerDown}
	on:pointermove={handlePointerMove}
	on:pointerup={handlePointerUp}
	style={styleToString({
		...style,
		position: "absolute"
	})}
	{...$$restProps}
>
	<slot />
</div>
