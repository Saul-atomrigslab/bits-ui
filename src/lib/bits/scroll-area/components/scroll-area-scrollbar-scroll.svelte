<script lang="ts">
	import { onDestroy } from "svelte";
	import { getScrollAreaCtx, getScrollbarCtx } from "../ctx.js";
	import { createStateMachine, isBrowser } from "$lib/internal/index.js";
	import { debounceCallback } from "../utils.js";
	import ScrollAreaScrollbarVisible from "./scroll-area-scrollbar-visible.svelte";

	const rootCtx = getScrollAreaCtx();
	const { viewportElement, scrollHideDelay } = rootCtx;
	const scrollbarCtx = getScrollbarCtx();
	const { isHorizontal } = scrollbarCtx;

	const { state, dispatch } = createStateMachine("hidden", {
		hidden: {
			SCROLL: "scrolling"
		},
		scrolling: {
			SCROLL_END: "idle",
			POINTER_ENTER: "interacting"
		},
		interacting: {
			SCROLL: "interacting",
			POINTER_LEAVE: "scrolling"
		},
		idle: {
			HIDE: "hidden",
			SCROLL: "scrolling",
			POINTER_ENTER: "interacting"
		}
	});

	$: if ($state === "idle" && isBrowser) {
		window.setTimeout(() => dispatch("HIDE"), $scrollHideDelay);
	}

	const debouncScrollEnd = debounceCallback(() => dispatch("SCROLL_END"), 100);

	let unsubScroll: () => void;

	$: if ($viewportElement && isBrowser) {
		const scrollDirection = $isHorizontal ? "scrollLeft" : "scrollTop";
		let prevScrollPos = $viewportElement[scrollDirection];
		let unsubScroll = () => {
			if (!$viewportElement) return;
			const scrollPos = $viewportElement[scrollDirection];
			const hasScrollInDirectionCHanged = prevScrollPos !== scrollPos;
			if (hasScrollInDirectionCHanged) {
				dispatch("SCROLL");
				debouncScrollEnd();
			}
			prevScrollPos = scrollPos;
		};
		$viewportElement.addEventListener("scroll", unsubScroll);
	}

	onDestroy(() => {
		unsubScroll?.();
	});
</script>

{#if $state !== "hidden"}
	<ScrollAreaScrollbarVisible {...$$restProps}>
		<slot />
	</ScrollAreaScrollbarVisible>
{/if}
