export const isBrowser = typeof document !== "undefined";

export function isHTMLElement(e: unknown): e is HTMLElement {
	return e instanceof HTMLElement;
}
