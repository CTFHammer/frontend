<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let prefix: string | null = null;
	export let suffix: string | null = null;
	export let value: string | null = null;
	export let label: string | null = null;

	const dispatch = createEventDispatcher();

	function handleInput(event: Event) {
		const element = event.target as HTMLInputElement;
		value = element.value;
		dispatch('inputChange', { value: value });
	}
</script>

{#if label}
	<p class="mb-2 font-medium">{label}</p>
{/if}
<div class="flex">
	{#if prefix}
		<span
			class="text-surface dark:border-dark-yellow-400 whitespace-nowrap border border-e-0
       border-solid border-neutral-200 px-3 py-[0.25rem] text-center text-base
       font-normal">{prefix}</span
		>
	{/if}
	<input
		bind:value
		class="text-surface focus:border-primary focus:shadow-inset
    dark:border-dark-yellow-400 flex-auto border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3
     py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition duration-200 ease-in-out
     placeholder:text-neutral-500 focus:z-[3] focus:outline-none
     motion-reduce:transition-none
     "
		on:input={handleInput}
		type="text"
	/>
	{#if suffix}
		<span
			class="text-surface dark:border-dark-yellow-400 whitespace-nowrap border border-s-0 border-solid border-neutral-200 px-3 py-[0.25rem] text-center text-base font-normal
      leading-[1.6]
      ">{suffix}</span
		>
	{/if}
</div>
