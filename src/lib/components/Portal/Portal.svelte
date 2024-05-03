<script lang="ts">
	import { attachToBody } from './logic';
	export let visible = false;

	export function show() {
		visible = true;
	}

	export function hide() {
		visible = false;
	}

	export function toggle() {
		visible = !visible;
	}

	function closeOut(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			hide();
		}
	}
</script>

{#if visible}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		use:attachToBody
		class=" dark:border-dark-yellow-400 fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center
    bg-yellow-700 bg-opacity-40 dark:text-white"
		on:click={closeOut}
	>
		<div
			class="dark:border-dark-yellow-400 flex h-[80%] w-[60%] flex-col rounded border bg-white p-5 dark:bg-dark-yellow-600"
		>
			<div class="flex justify-end">
				<button class="btn" on:click={hide}>Close</button>
			</div>
			<hr class="my-4" />
			<div class="overflow-auto">
				<slot />
			</div>
		</div>
	</div>
{/if}
