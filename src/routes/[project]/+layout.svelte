<script lang="ts">
	import type { LayoutData } from './$types';
	import { api } from '$lib/client/requests';
	import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { socket } from '$lib/client/socket';

	export let data: LayoutData;

	const { project } = data;

	function startListen() {
		api(`${PUBLIC_VITE_BACKEND_URL}/project/start-watch/${project.name}`);
	}

	onMount(() => {
		socket.on('new_pcap', (val) => {
			console.log('new pcap', val);
		});
	});
</script>

<div class="flex-1 flex">
	<aside class="p-5 w-1/5 bg-white border-r overflow-auto max-h-[calc(100vh-75px)]">
		<div>
			<button class="btn" on:click={startListen}>Start listening files</button>
		</div>
		<div class="flex flex-col">
			<p>Project:</p>
			<span class="font-bold text-2xl text-yellow-600">{project.name}</span>
			<span>Another info info</span>
		</div>
	</aside>

	<div class="p-7">
		<slot />
	</div>
</div>
