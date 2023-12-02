<script lang="ts">
	import { getContext } from "svelte";
	import { getAttrs } from "../ctx.js";
	import type { ValueProps } from "../types.js";
	import type { Writable } from "svelte/store";

	type $$Props = ValueProps;

	export let placeholder: $$Props["placeholder"] = "";
	export let asChild: $$Props["asChild"] = false;

	const selectedLabel = getContext<Writable<string>>("selectedLabel");

	const attrs = getAttrs("value");

	$: label = $selectedLabel;
	$: slotProps = { label, attrs };
</script>

{#if asChild}
	<slot {...slotProps} />
{:else}
	<span {...$$restProps} {...attrs}>
		{label ? label : placeholder}
	</span>
{/if}
