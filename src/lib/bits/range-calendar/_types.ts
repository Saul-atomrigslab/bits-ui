/**
 * We define prop types without the HTMLAttributes here so that we can use them
 * to type-check our API documentation, which requires we document each prop,
 * but we don't want to document the HTML attributes.
 */

import type { AsChild, OnChangeFn } from "$lib/internal/index.js";
import type { DateRange } from "$lib/shared/index.js";
import type { DateValue } from "@internationalized/date";
import type { CreateRangeCalendarProps } from "@melt-ui/svelte";

type Props = Expand<
	Omit<
		CreateRangeCalendarProps,
		| "placeholder"
		| "defaultPlaceholder"
		| "value"
		| "defaultValue"
		| "onPlaceholderChange"
		| "onValueChange"
		| "ids"
	> & {
		placeholder?: DateValue;
		value?: DateRange;
		onPlaceholderChange?: OnChangeFn<DateValue>;
		onValueChange?: OnChangeFn<DateRange>;
	} & AsChild
>;

type PrevButtonProps = AsChild;

type NextButtonProps = AsChild;

type HeadingProps = AsChild;

type HeaderProps = AsChild;

type GridHeadProps = AsChild;

type HeadCellProps = AsChild;

type GridProps = AsChild;

type GridBodyProps = AsChild;

type GridRowProps = AsChild;

type BaseDateProps = Expand<
	{
		/**
		 * The date value of the cell.
		 */
		date: DateValue;

		/**
		 * The month value that the cell belongs to.
		 */
		month: DateValue;
	} & AsChild
>;

type CellProps = Expand<Omit<BaseDateProps, "month">>;

type DateProps = Expand<BaseDateProps>;

export type {
	Props,
	PrevButtonProps,
	NextButtonProps,
	HeadingProps,
	HeaderProps,
	GridProps,
	GridHeadProps,
	HeadCellProps,
	GridBodyProps,
	GridRowProps,
	CellProps,
	DateProps
};