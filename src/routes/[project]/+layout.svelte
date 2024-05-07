<script lang="ts">
	import type { LayoutData } from './$types';
	import { api } from '$lib/client/requests';
	import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { socket } from '$lib/client/socket';
	import {
		addSuccessNotification,
		addErrorNotification,
		addNotification
	} from '$lib/components/notifications/notificationStore';
	import { goto, invalidate } from '$app/navigation';
	export let data: LayoutData;

	let project = data.project;
	let currentlyDumping = project.pid_tcpdump && project.pid_tcpdump !== '';
	let currentlyTotalTask = project.task_total && project.task_total !== '';

	$: if (data && data.project) {
		project = data.project;
		currentlyDumping = project.pid_tcpdump && project.pid_tcpdump !== '';
		currentlyTotalTask = project.task_total && project.task_total !== '';
	}

	const actions = {
		startTcpDump: 'start-tcp-dump',
		analyzePcap: 'analyze-pcap',
		stopTcpdump: 'stop-tcp-dump',
		downloadDump: 'download-dump',
		startTotalDump: 'start-total-dump',
		stopTotalDump: 'stop-total-dump'
	};

	async function startTask(type: keyof typeof actions) {
		const res = await fetch(`${PUBLIC_VITE_BACKEND_URL}/project/${actions[type]}/${project.name}`);
		const ris = await res.json();
		if (res.ok) {
			console.log(ris);
			addSuccessNotification('Done', 'Ok 🐒');
			invalidate('app:project');
		} else {
			console.error(ris);
			addErrorNotification('Something went wrong', `Task ${type} gone wrong.`);
		}
	}

	async function deleteProject() {
		try {
			const res = await fetch(`${PUBLIC_VITE_BACKEND_URL}/project/delete/${project.name}`);
			if (res.ok) {
				addSuccessNotification('Delete', 'Project deleted successfuly');
				await goto('/').then(() => {
					invalidate('app:projects');
				});
			} else {
				addErrorNotification('Error', 'Cannot delete. Error');
			}
		} catch (e) {
			addErrorNotification('Generic Error', 'Error on server');
		}
	}

	onMount(() => {
		socket.on('new_conversations', (val) => {
			console.log(val);
			addSuccessNotification(
				`New conversation for "${val.project_name}"`,
				`Added ${val.conversations} new conversations!`
			);
		});
	});
</script>

<div class="flex max-h-[calc(100vh-76px)] flex-1">
	<aside
		class="max-h-[calc(100vh-75px)] min-w-72 overflow-auto border-r bg-white p-5
  dark:border-dark-yellow-400 dark:bg-dark-yellow-600
  "
	>
		<div class="flex flex-col mb-3">
			<span class="text-2xl font-bold text-yellow-600">{project.name}</span>
		</div>

		<div class="font-mono">
			<p>
				Dumping: <span
					class="{!currentlyDumping
						? 'bg-red-600'
						: 'bg-green-600'} rounded-full w-3 h-3 inline-block"
				>
				</span>
			</p>
			<p>
				Analysing: <span
					class="{!currentlyTotalTask
						? 'bg-red-600'
						: 'bg-green-600'} rounded-full w-3 h-3 inline-block"
				></span>
			</p>
		</div>

		<div class="flex flex-col gap-4 my-3">
			<span>Quick actions</span>
			<div class="grid grid-cols-2 gap-2">
				<button class="btn" on:click={() => startTask('startTcpDump')} disabled={currentlyDumping}>
					Start tcpdump
				</button>
				<button class="btn" on:click={() => startTask('stopTcpdump')} disabled={!currentlyDumping}
					>Stop tcpdump</button
				>
			</div>
			<hr class="h-px dark:bg-dark-yellow-300 border-0" />
			<button class="btn" on:click={() => startTask('analyzePcap')}>Analyze pcap</button>
			<hr class="h-px dark:bg-dark-yellow-300 border-0" />
			<button class="btn" on:click={() => startTask('downloadDump')}>Download pcap</button>
			<div>
				<button
					class="btn btn-out"
					on:click={() => startTask('startTotalDump')}
					disabled={currentlyTotalTask}>Start total dump</button
				>
				<button
					class="btn btn-out"
					on:click={() => startTask('stopTotalDump')}
					disabled={!currentlyTotalTask}>Stop total dump</button
				>
			</div>

			<div>
				<span class="text-lg font-bold">Menu</span>
				<div>
					<a data-sveltekit-replacestate href={`/${project.name}/conversations`}>
						<span>icon</span>
						<span>Conversation</span>
					</a>
				</div>
			</div>
		</div>
	</aside>

	<div class="overflow-auto flex-1">
		<slot />
	</div>
</div>
