<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Portal from 'svelte-portal';

	export let prefix: string | null = null;
	export let suffix: string | null = null;
	export let value: string | null = null;

	const dispatch = createEventDispatcher();

	function handleInput(event: KeyboardEvent) {
		const { value } = event.target as HTMLInputElement;
		dispatch('inputChange', { value });
	}
</script>


<div class="flex bg-white">
	{#if prefix}
		<span
			class=" whitespace-nowrap rounded-s border border-e-0 border-solid border-neutral-200 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-surface dark"
			>{prefix}</span
		>
	{/if}
	<input
		on:keyup={handleInput}
		{value}
		type="text"
		class="flex-auto border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none"
	/>
	{#if suffix}
		<span
			class=" whitespace-nowrap rounded-e border border-s-0 border-solid border-neutral-200 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-surface"
			>{suffix}</span
		>
	{/if}
</div>
