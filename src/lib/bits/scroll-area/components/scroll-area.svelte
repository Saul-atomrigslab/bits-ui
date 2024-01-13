<script lang="ts">
	import { writable } from "svelte/store";
	import type { Direction, ScrollType } from "../ctx.js";
	import { setScrollAreaCtx } from "../ctx.js";
	import { styleToString } from "$lib/internal/style.js";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = {
		type?: ScrollType;
		dir?: Direction;
		scrollHideDelay?: number;
		el?: HTMLElement | null;
	} & HTMLAttributes<HTMLElement>;

	type $$Props = Props;

	let typeProp: ScrollType = "always";
	let scrollHideDelayProp = 600;
	let dirProp: Direction = "ltr";
	export let el: HTMLElement | null | undefined = undefined;
	export { typeProp as type, dirProp as dir, scrollHideDelayProp as scrollHideDelay };

	const cornerWidth = writable(0);
	const cornerHeight = writable(0);
	const viewportElement = writable<HTMLElement | undefined>(undefined);
	const contentElement = writable<HTMLElement | undefined>(undefined);
	const scrollAreaElement = writable<HTMLElement | undefined>(undefined);
	const scrollbarXElement = writable<HTMLElement | undefined>(undefined);
	const scrollbarYElement = writable<HTMLElement | undefined>(undefined);
	const scrollbarXEnabled = writable(false);
	const scrollbarYEnabled = writable(false);
	const type = writable<ScrollType>(typeProp);
	const dir = writable<Direction>(dirProp);
	const scrollHideDelay = writable<number>(scrollHideDelayProp);

	setScrollAreaCtx({
		type,
		dir,
		scrollHideDelay,
		cornerWidth,
		cornerHeight,
		viewportElement,
		contentElement,
		scrollAreaElement,
		scrollbarXElement,
		scrollbarYElement,
		scrollbarXEnabled,
		scrollbarYEnabled
	});
</script>

<div
	bind:this={el}
	data-dir={$dir}
	{...$$restProps}
	style={styleToString({
		position: "relative",
		"--bits-scroll-area-corner-height": `${$cornerHeight}px`,
		"--bits-scroll-area-corner-width": `${$cornerWidth}px`
	})}
>
	<slot />
</div>
