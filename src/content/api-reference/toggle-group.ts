import type { APISchema } from "@/types";
import { asChild, enums } from "@/content/api-reference/helpers.js";
import type * as ToggleGroup from "$lib/bits/toggle-group/_types.js";
import * as C from "@/content/constants.js";
import { union } from "./helpers";

const root: APISchema<ToggleGroup.Props<"multiple">> = {
	title: "Root",
	description: "The root component which contains the toggle group items.",
	props: {
		value: {
			type: union(C.STRING, "string[]"),
			description:
				"The value of the toggle group. If the type is multiple, this will be an array of strings, otherwise it will be a string."
		},
		onValueChange: {
			type: {
				type: C.FUNCTION,
				definition: union("(value: string) => void", "(value: string[]) => void")
			},
			description:
				"A callback function called when the value of the toggle group changes. The type of the value is dependent on the type of the toggle group."
		},
		disabled: {
			default: C.FALSE,
			type: C.BOOLEAN,
			description: "Whether or not the switch is disabled."
		},
		loop: {
			default: C.TRUE,
			type: C.BOOLEAN,
			description: "Whether or not the toggle group should loop when navigating."
		},
		orientation: {
			default: C.HORIZONTAL,
			type: enums(C.HORIZONTAL, C.VERTICAL),
			description: "The orientation of the toggle group."
		},
		rovingFocus: {
			default: C.TRUE,
			type: C.BOOLEAN,
			description: "Whether or not the toggle group should use roving focus when navigating."
		},
		type: {
			default: "single",
			description: "The type of toggle group.",
			type: enums("single", "multiple")
		},
		asChild
	},
	dataAttributes: [
		{
			name: "orientation",
			description: "The orientation of the toggle group."
		},
		{
			name: "bits-toggle-group-root",
			description: "Present on the root element."
		}
	]
};

const item: APISchema<ToggleGroup.ItemProps> = {
	title: "Root",
	description: "The toggle button.",
	props: {
		value: {
			type: C.STRING,
			description: "The value of the item."
		},
		disabled: {
			default: C.FALSE,
			type: C.BOOLEAN,
			description: "Whether or not the switch is disabled."
		},
		asChild
	},
	dataAttributes: [
		{
			name: "state",
			value: enums("on", "off"),
			description: "Whether the toggle item is in the on or off state."
		},
		{
			name: "value",
			description: "The value of the toggle item."
		},
		{
			name: "orientation",
			description: "The orientation of the toggle group."
		},
		{
			name: "disabled",
			description: "Present when the toggle item is disabled."
		},
		{
			name: "bits-toggle-group-item",
			description: "Present on the item elements."
		}
	]
};

export const toggleGroup = [root, item];