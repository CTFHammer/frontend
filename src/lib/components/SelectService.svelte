<script lang="ts">
	import Portal from './Portal/Portal.svelte';
	import { CustomError, getListContainer, type getListContainerResponse } from './requests';
	import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import type { Project } from '$lib/types/general';

	let portal: Portal;
	let listContainer: getListContainerResponse[] = [];

	function openPortal() {
		getListContainer()
			.then((containers) => {
				if (!(containers instanceof CustomError)) {
					portal.show();

					listContainer = containers;
				}
			})
			.catch();
	}

	function addToService(name: string) {
		fetch(`${PUBLIC_VITE_BACKEND_URL}/project/create-project/${name}`).then((res) => {
			console.log(res);
		});
	}

	// TODO add the initial state right
	let currentSelect = '/';

	export let projects: Project[] = [];
</script>

<div class="flex items-center gap-2">
	<select
		bind:value={currentSelect}
		class="dark:border-dark-yellow-400 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500
     focus:ring-blue-500 dark:bg-dark-yellow-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500
    "
		name="servizi"
		on:change={() => {
			goto(currentSelect);
		}}
	>
		<option value="/">/home</option>
		{#each projects as menuItem}
			<option value={menuItem.name}>/{menuItem.name}</option>
		{/each}
	</select>
</div>

<Portal bind:this={portal}>
	<div class="flex flex-col p-4">
		<table class="min-w-full leading-normal">
			<thead>
				<tr>
					<th
						class="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
					>
						ID
					</th>
					<th
						class="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
					>
						Name
					</th>
					<th
						class="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
					>
						Networks
					</th>
					<th
						class="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
					>
						Action
					</th>
				</tr>
			</thead>
			<tbody>
				{#each listContainer as container}
					<tr>
						<td class="border-b border-gray-200 bg-white px-5 py-3 text-sm">
							<div
								class="overflow-hidden overflow-ellipsis whitespace-nowrap font-medium text-gray-900"
								style="max-width: 150px;"
							>
								{container.id}
							</div>
						</td>
						<td class="border-b border-gray-200 bg-white px-5 py-3 text-sm">
							<div class="whitespace-nowrap text-gray-900">
								{container.name}
							</div>
						</td>
						<td class="border-b border-gray-200 bg-white px-5 py-3 text-sm">
							<div class="whitespace-nowrap text-gray-900">
								<!-- Qui puoi visualizzare informazioni specifiche sulla rete o gestirlo in base ai tuoi dati -->
								{Object.keys(container.networks)[0]}
								Host port:{JSON.stringify(Object.values(container.networks)[0][0]['HostPort'])}
							</div>
						</td>
						<td class="border-b border-gray-200 bg-white px-5 py-3 text-sm">
							<button class="btn" on:click={() => addToService(container.name)}>Add</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Portal>
