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
		class="fixed z-50 w-full h-full flex items-center justify-center bg-yellow-700 bg-opacity-40 top-0 left-0"
		on:click={closeOut}
	>
		<div class="bg-white w-[60%] h-[80%] rounded border p-5 flex flex-col">
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
