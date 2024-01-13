// https://github.com/Hugos68/svelte-contextify
import { getContext, setContext } from "svelte";

export function createContext<T>(): [() => T, (value: T) => T, symbol];

export function createContext<T>() {
	const key = Symbol();
	return [() => getContext<T>(key), (value: T) => setContext<T>(key, value), key];
}
