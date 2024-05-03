<script lang="ts">
	import Input from '$lib/components/input.svelte';
	import { post } from '$lib/client/requests';
	import { type Settings, CTFNotificationType } from '$lib/types/general';
	import { storeSetting } from '$lib/store';
	import Single from '$lib/components/layouts/single.svelte';
	import {
		addErrorNotification,
		addNotification,
		addSuccessNotification
	} from '$lib/components/notifications/notificationStore';
	import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let regexFlag = data.settings.regexFlag || '';
	let stringToTest = '';
	let result = false;
	let dirty = true;
	let reCheck: RegExp;
	let vulIp = data.settings.vulIp || '';
	let vulPass = data.settings.vulPass || '';
	let vulPort = data.settings.vulPort || '';

	async function testConntetion() {
		try {
			const rest = await fetch(`${PUBLIC_VITE_BACKEND_URL}/test-vul-connection`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ vulIp, vulPass, vulPort: parseInt(vulPort) })
			});

			if (rest.ok) {
				const body = await rest.json();
				console.log(body);
				if (body.status == 1) {
					addErrorNotification('SSH result', 'nope');
				} else {
					addSuccessNotification('SSH result', 'connected');
				}
			}
		} catch {
			addErrorNotification('Server Error', 'generic error');
		}
	}

	function checkRegex(event: CustomEvent<any>) {
		stringToTest = event.detail.value;
		reCheck = new RegExp(regexFlag);

		result = reCheck.test(stringToTest);
	}

	function save() {
		post<Settings, any>('settings', { regexFlag, vulIp, vulPort: parseInt(vulPort), vulPass })
			.then((res) => {
				addNotification({
					title: 'Database',
					message: 'Saved successfuly',
					type: CTFNotificationType.success
				});

				if (res.saved) {
					storeSetting.setStore(res.saved);
				}
			})
			.catch(() => {
				addNotification({
					title: 'Database',
					message: 'Saved successfuly',
					type: CTFNotificationType.error
				});
			});
		dirty = false;
	}
</script>

<div class="mx-auto w-[80%] max-w-screen-lg">
	<Single>
		<h1 slot="title" class="">Hello in CTF Hammer</h1>
		<button slot="action" class="btn btn-out ml-auto block" disabled={!dirty} on:click={save}
			>Save</button
		>

		<div>
			<div class="flex max-w-md flex-col gap-5">
				<div>
					<Input prefix="/" suffix="/" bind:value={regexFlag} label="Set you regex flag" />
					<Input on:inputChange={checkRegex} label="Test you regex" />
					<p class="my-2">Test result: {result ? '😀' : '😔'}</p>
				</div>

				<hr />
				<div>
					<p class="sub-title">Vulbox Info</p>
					<span>Insert the info of your vulbox</span>
				</div>
				<div class="flex gap-3 flex-col">
					<Input label="Vulbox ip" bind:value={vulIp} />
					<Input label="Vulbox password" bind:value={vulPass} />
					<Input label="Vulbox Port" bind:value={vulPort} />
					<div>
						<button class="btn btn-out" on:click={testConntetion}>Test connection</button>
					</div>
				</div>
			</div>
		</div>
	</Single>

	<Single>
		<h1 slot="title">Your Current projects</h1>

		<div class="flex flex-wrap gap-3">
			{#each data.projects as project}
				<a
					href={project.name}
					class="flex flex-col rounded border p-5 dark:border-dark-yellow-400 dark:bg-dark-yellow-400"
				>
					<span>Name: <span class="inline-pre">{project.name}</span></span>
				</a>
			{:else}
				<div>No projects?! Come one</div>
			{/each}
		</div>
	</Single>
</div>
