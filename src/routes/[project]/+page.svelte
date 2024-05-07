<script lang="ts">
	import Input from '$lib/components/input.svelte';
	import { api, post } from '$lib/client/requests';
	import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
	import type { LayoutData } from '../../../.svelte-kit/types/src/routes/[project]/$types';
	import Conversation from '$lib/components/project/conversation.svelte';
	import Single from '$lib/components/layouts/single.svelte';
	import { invalidate, invalidateAll } from '$app/navigation';
	import type { Project } from '$lib/types/general';
	import { page } from '$app/stores';
	import {
		addErrorNotification,
		addSuccessNotification
	} from '$lib/components/notifications/notificationStore';
	// import { PageData } from '../$types';

	// export let data: PageData;

	export let data;

	let port = data.project.port || 0;

	async function savePort() {
		const response = await fetch(`${PUBLIC_VITE_BACKEND_URL}/project/set-port`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ project_name: data.project.name, port: parseInt(port) })
		});

		if (!response.ok) {
			console.error('HTTP error', response.status);
			const errorData = await response.json();
			console.error('Error response:', errorData);
			addErrorNotification('Save', 'Cannot save project');
		} else {
			const responseData = await response.json();
			addSuccessNotification('Save', 'Saved!');
			console.log(responseData);
		}
	}
</script>

<div class="w-full">
	<Single>
		<span slot="title">Manage setting of this project</span>
		<button slot="action" class="btn btn-out ml-auto" on:click={savePort}>Save</button>
		<div class="flex gap-2">
			<Input bind:value={port} label="Specify port" />
		</div>
	</Single>
</div>
