import { createContext, type Expand } from "$lib/internal/index.js";
import type { Readable, Writable } from "svelte/store";

export type ScrollType = "auto" | "always" | "scroll" | "hover";
export type Direction = "ltr" | "rtl";

export type Sizes = {
	content: number;
	viewport: number;
	scrollbar: {
		size: number;
		paddingStart: number;
		paddingEnd: number;
	};
};

export type ScrollAreaRootContext = {
	type: Writable<ScrollType>;
	dir: Writable<Direction>;
	scrollHideDelay: Writable<number>;
	scrollAreaElement: Writable<HTMLElement | undefined>;
	viewportElement: Writable<HTMLElement | undefined>;
	contentElement: Writable<HTMLElement | undefined>;
	scrollbarXElement: Writable<HTMLElement | undefined>;
	scrollbarXEnabled: Writable<boolean>;
	scrollbarYElement: Writable<HTMLElement | undefined>;
	scrollbarYEnabled: Writable<boolean>;
	cornerWidth: Writable<number>;
	cornerHeight: Writable<number>;
};

export const [getScrollAreaCtx, setScrollAreaCtx, scrollAreaKey] =
	createContext<Expand<ScrollAreaRootContext>>();

export type Orientation = "horizontal" | "vertical";

export type ScrollAreaScrollbarContext = {
	orientation: Writable<Orientation>;
	isHorizontal: Writable<boolean>;
};

export const [getScrollbarCtx, setScrollbarCtx, scrollbarKey] =
	createContext<ScrollAreaScrollbarContext>();

export type ScrollAreaScrollbarVisibleContext = {
	sizes: Writable<Sizes>;
	hasThumb: Readable<boolean>;
	handleWheelScroll: (e: WheelEvent, payload: number) => void;
	handleThumbDown: (e: MouseEvent, payload: { x: number; y: number }) => void;
	handleThumbUp: (e: MouseEvent) => void;
	handleSizeChange: (payload: Sizes) => void;
	onThumbPositionChange: () => void;
	onDragScroll: (payload: number) => void;
	onThumbChange: (element: HTMLElement) => void;
};

export const [getScrollbarVisibleCtx, setScrollbarVisibleCtx, scrollbarVisibleKey] =
	createContext<ScrollAreaScrollbarVisibleContext>();
