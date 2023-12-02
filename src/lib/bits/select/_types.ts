/**
 * We define prop types without the HTMLAttributes here so that we can use them
 * to type-check our API documentation, which requires we document each prop,
 * but we don't want to document the HTML attributes.
 */
import type { CreateSelectProps, SelectOptionProps } from "@melt-ui/svelte";
import type { AsChild, Expand, OmitFloating, OnChangeFn } from "$lib/internal/index.js";
import type { ContentProps, ArrowProps } from "$lib/bits/floating/_types.js";

type Props<T = unknown> = Expand<
	OmitFloating<Omit<CreateSelectProps, "selected" | "defaultSelected" | "onSelectedChange">> & {
		/**
		 * The selected value of the select.
		 * You can bind this to a value to programmatically control the selected value.
		 *
		 * @default undefined
		 */
		selected?: CreateSelectProps["defaultSelected"] & {};

		/**
		 * The selected value of the select.
		 * You can bind this to a value to programmatically control the selected value.
		 *
		 * @default undefined
		 */
		value?: T;

		/**
		 * The selected value of the select.
		 * You can bind this to a value to programmatically control the selected value.
		 *
		 * @default undefined
		 */
		onValueChange?: OnChangeFn<T>;

		/**
		 * The label to display with the value prop (if any).
		 * If you don't provide a label, the value will be displayed as the label.
		 * If you programmatically control the `value`, you must also update the `label` to match
		 * or the label will be out of sync with the value.
		 *
		 * @default undefined
		 */
		label?: string;

		/**
		 * A callback function called when the selected value changes.
		 */
		onSelectedChange?: OnChangeFn<T>;

		/**
		 * The open state of the select menu.
		 * You can bind this to a boolean value to programmatically control the open state.
		 *
		 * @default false
		 */
		open?: boolean;

		/**
		 * A callback function called when the open state changes.
		 */
		onOpenChange?: OnChangeFn<boolean>;
	}
>;

type GroupProps = AsChild;
type InputProps = AsChild;
type LabelProps = AsChild;
type ItemProps = Expand<SelectOptionProps & AsChild>;
type SeparatorProps = AsChild;

type IndicatorProps = AsChild;

type TriggerProps = AsChild;

type ValueProps = Expand<
	{
		/**
		 * The placeholder text to display when there is no value.
		 *
		 * @default ""
		 */
		placeholder?: string;
	} & AsChild
>;

export type {
	Props,
	ArrowProps,
	ContentProps,
	IndicatorProps,
	GroupProps,
	InputProps,
	LabelProps,
	ItemProps,
	SeparatorProps,
	TriggerProps,
	ValueProps
};
