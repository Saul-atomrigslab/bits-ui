<script lang="ts">
	import { ScrollArea, Separator } from "$lib/index.js";
	const tags = Array.from({ length: 50 }).map((_, i, a) => `v.1.2.0-beta.${a.length - i}`);
</script>

<ScrollArea.Root class="relative h-72 w-48 overflow-hidden rounded-md border">
	<ScrollArea.Viewport class="h-full w-full rounded-[inherit]">
		<div class="p-4">
			<h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
			{#each tags as tag (tag)}
				<div class="text-sm">
					{tag}
				</div>
				<Separator.Root class="my-2 h-px w-full bg-border" />
			{/each}
		</div>
	</ScrollArea.Viewport>
	<ScrollArea.Scrollbar
		class="flex h-full w-2.5 touch-none select-none border-l border-l-transparent p-px transition-colors"
	>
		<ScrollArea.Thumb class="relative flex-1 rounded-full bg-border" />
	</ScrollArea.Scrollbar>
	<ScrollArea.Corner />
</ScrollArea.Root>
