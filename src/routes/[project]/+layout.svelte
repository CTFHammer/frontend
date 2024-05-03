<script lang="ts">
	import type { LayoutData } from './$types';
	import { api } from '$lib/client/requests';
	import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { socket } from '$lib/client/socket';
	export let data: LayoutData;

	let project = data.project;
	$: if (data && data.project) {
    project = data.project
	}

	function startListen() {
		api(`${PUBLIC_VITE_BACKEND_URL}/project/start-watch/${project.name}`);
	}

	onMount(() => {
		socket.on('new_pcap', (val) => {
			console.log('new pcap', val);
		});
	});
</script>

<div class="flex max-h-[calc(100vh-75px)] flex-1">
	<aside
		class="max-h-[calc(100vh-75px)] min-w-80 overflow-auto border-r bg-white p-5
  dark:border-gray-700 dark:bg-dark-yellow-600
  "
	>
		<div>
			<button class="btn" on:click={startListen}>Start listening files</button>
		</div>
		<div class="flex flex-col">
			<p>Project:</p>
			<span class="text-2xl font-bold text-yellow-600">{data.project.name}</span>
			<span>Another info info</span>
		</div>
	</aside>

	<div class="overflow-auto p-7">
		<slot />
	</div>
</div>
