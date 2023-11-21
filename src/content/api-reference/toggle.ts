import type { APISchema } from "@/types";
import { asChild, enums } from "@/content/api-reference/helpers.js";
import type * as Toggle from "$lib/bits/toggle/_types.js";
import * as C from "@/content/constants.js";

const root: APISchema<Toggle.Props> = {
	title: "Root",
	description: "The toggle button.",
	props: {
		pressed: {
			default: C.FALSE,
			type: C.BOOLEAN,
			description: "Whether or not the toggle button is pressed."
		},
		onPressedChange: {
			type: {
				type: C.FUNCTION,
				definition: "(checked: boolean) => void"
			},
			description: "A callback function called when the pressed state of the toggle changes."
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
			description: "Whether the toggle is in the on or off state."
		},
		{
			name: "disabled",
			description: "Present when the toggle is disabled."
		},
		{
			name: "bits-toggle-root",
			description: "Present on the root element."
		}
	]
};

export const toggle = [root];