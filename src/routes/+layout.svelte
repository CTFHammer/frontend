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
	import Notification from '$lib/components/notifications/notification.svelte';
	import {
		addErrorNotification,
		addSuccessNotification
	} from '$lib/components/notifications/notificationStore';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { socket } from '$lib/client/socket';

	export let data: LayoutData;
	let portal: Portal;
	let newName = '';
	storeSetting.initStore(data as any);

	function createNewProject() {
		fetch(`${PUBLIC_VITE_BACKEND_URL}/project/create/${newName}`).then(async (res) => {
			if (!res.ok) {
				if (res.status == 409) {
					addErrorNotification('Project', `Project ${newName} already exists!`);
					return;
				}
				addErrorNotification('Project', `Error ${res.status} `);
				return;
			}
			invalidate('app:projects');
			addSuccessNotification('Project', `Project ${newName} created!`);
			portal.hide();
		});
	}

	onMount(() => {
		// socket.on('debug', (val: { project_name: string; conversations: string }) => {
		// 	console.log('messaggio ricevuto', val);
		// });
	});
</script>

<Notification></Notification>

<Portal bind:this={portal}>
	<div class="">
		<Input bind:value={newName} label="New name" />
		<button class="btn" on:click={createNewProject}>Salva</button>
	</div>
</Portal>

<div class="flex min-h-screen flex-col bg-yellow-400 bg-opacity-10 dark:bg-dark-yellow-800">
	<div
		class="sticky top-0 flex items-center bg-white px-10 py-4
    align-middle dark:border-b dark:border-dark-yellow-400 dark:bg-dark-yellow-800 dark:text-gray-100"
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
			<a class="text-lg font-bold" href="/">CTF Hammer</a>
		</div>

		<div class="flex-1 text-end"></div>
	</div>

	<div class="flex flex-1 flex-col dark:text-gray-100">
		<slot />
	</div>
</div>
