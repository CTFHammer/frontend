<script lang="ts">
	import './app.css';
	import type { LayoutData } from './$types';
	import { storeSetting } from '$lib/store';
	import SelectService from '$lib/components/SelectService.svelte';
	import { api } from '$lib/client/requests';
	import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
	import Portal from '$lib/components/Portal/Portal.svelte';
	import Input from '$lib/components/input.svelte';
	import Single from '$lib/components/layouts/single.svelte';

	export let data: LayoutData;
	let portal: Portal;
	let newName = '';
	storeSetting.initStore(data as any);

	function createNewProject() {
		api(`${PUBLIC_VITE_BACKEND_URL}/project/create/${newName}`).then((res) => {
			console.log(res);
			portal.hide();
		});
	}
</script>

<Portal bind:this={portal}>
	<div class="">
		<label>New Name</label>
		<Input bind:value={newName} />
		<button class="btn" on:click={createNewProject}>Salva</button>
	</div>
</Portal>

<div class="dark:bg-dark-yellow-800 flex min-h-screen flex-col bg-yellow-400 bg-opacity-10">
	<div
		class="dark:bg-dark-yellow-800 dark:border-dark-yellow-400 sticky top-0 flex items-center bg-white
    px-10 py-4 align-middle dark:border-b dark:text-gray-100"
	>
		<div class=" flex flex-1 items-center gap-5 align-middle">
			<SelectService projects={data.projects} />
			<!-- <button class="btn" on:click={openPortal}>Add Service</button> -->
			<button
				class="btn"
				on:click={() => {
					portal.show();
				}}>Add manual project</button
			>
		</div>
		<div class="flex justify-center">
			<span class="text-lg font-bold">CTF Hammer</span>
		</div>

		<div class="flex-1 text-end"></div>
	</div>

	<div class="flex flex-1 flex-col dark:text-gray-100">
		<slot />
	</div>
</div>
