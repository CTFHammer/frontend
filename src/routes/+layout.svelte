<script lang="ts">
	import './app.css';
	import type { LayoutData } from './$types';
	import { storeSetting } from '$lib/store';
	import SelectService from '$lib/components/SelectService.svelte';
	import { api } from '$lib/client/requests';
	import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
	import Portal from '$lib/components/Portal/Portal.svelte';
	import Input from '$lib/components/input.svelte';

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


	console.log(data);

</script>


<Portal bind:this={portal}>
	<div>
		<label>New Name</label>
		<Input bind:value={newName} />
		<button class="btn" on:click={createNewProject}>Salva</button>
	</div>
</Portal>


<div class="bg-yellow-400 bg-opacity-10 min-h-screen flex flex-col">
	<div class="flex bg-white py-4 px-10 align-middle items-center sticky top-0">
		<div class="flex-1 flex gap-5">
			<SelectService projects={data.projects} />
			<button class="btn" on:click={() => {portal.show()}}>Add manual project</button>
		</div>
		<div class="flex justify-center">
			<span class="font-bold text-lg">CTF Hammer</span>
		</div>

		<div class="flex-1 text-end">boc</div>
	</div>

	<div class="flex-1 flex flex-col">
		<slot />
	</div>
</div>
