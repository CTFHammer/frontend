<script lang="ts">
	import type { LayoutData } from './$types';
	import { api } from '$lib/client/requests';
	import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { socket } from '$lib/client/socket';
	import {
		addSuccessNotification,
		addErrorNotification
	} from '$lib/components/notifications/notificationStore';
	import { goto, invalidate } from '$app/navigation';
	export let data: LayoutData;

	let project = data.project;
	$: if (data && data.project) {
		project = data.project;
		console.log(project);
	}

	function startListen() {
		api(`${PUBLIC_VITE_BACKEND_URL}/project/start-watch/${project.name}`);
	}

	async function deleteProject() {
		try {
			const res = await fetch(`${PUBLIC_VITE_BACKEND_URL}/project/delete/${project.name}`);
			if (res.ok) {
				addSuccessNotification('Delete', 'Project deleted successfuly');
				await goto('/').then(() => {
					invalidate('app:projects');
					console.log('qui');
				});
			} else {
				addErrorNotification('Error', 'Cannot delete. Error');
			}
		} catch (e) {
			addErrorNotification('Generic Error', 'Error on server');
		}
	}

	onMount(() => {
		socket.on('new_pcap', (val) => {
			console.log('new pcap', val);
		});
	});
</script>

<div class="flex max-h-[calc(100vh-75px)] flex-1">
	<aside
		class="max-h-[calc(100vh-75px)] min-w-72 overflow-auto border-r bg-white p-5
  dark:border-dark-yellow-400 dark:bg-dark-yellow-600
  "
	>
		<div class="flex flex-col">
			<span class="text-2xl font-bold text-yellow-600">{data.project.name}</span>
			<span>Another info info</span>
		</div>

		<div class="flex flex-col gap-2 my-3">
			<div>
				<button class="btn" on:click={startListen}>Start listening files</button>
			</div>
			<button class="btn bg-red-600 w-fit" on:click={deleteProject}>Delete</button>
		</div>
	</aside>

	<div class="overflow-auto p-7 flex-1">
		<slot />
	</div>
</div>
