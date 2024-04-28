<script lang="ts">
	import Portal from './Portal/Portal.svelte';
	import { CustomError, getListContainer, type getListContainerResponse } from './requests';
	import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
	import { goto } from '$app/navigation';

	let portal: Portal;
	let listContainer: getListContainerResponse[] = [];

	function openPortal() {
		getListContainer()
			.then((containers) => {
				if (!(containers instanceof CustomError)) {
					portal.show();
					console.log(containers);

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

	export let projects = [];


</script>

<div class="flex-1 flex gap-2">
	<select
		bind:value={currentSelect}
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-36"
		name="servizi"
		on:change={() => {	goto(currentSelect)}}
	>
		<option value="/">/home</option>
		{#each projects as menuItem}
			<option value={menuItem}>/{menuItem}</option>
		{/each}
	</select>
	<button class="btn" on:click={openPortal}>Add Service</button>
</div>

<Portal bind:this={portal}>
	<div class="flex flex-col p-4">
		<table class="min-w-full leading-normal">
			<thead>
			<tr>
				<th
					class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
				>
					ID
				</th>
				<th
					class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
				>
					Name
				</th>
				<th
					class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
				>
					Networks
				</th>
				<th
					class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
				>
					Action
				</th>
			</tr>
			</thead>
			<tbody>
			{#each listContainer as container}
				<tr>
					<td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
						<div
							class="text-gray-900 font-medium whitespace-nowrap overflow-hidden overflow-ellipsis"
							style="max-width: 150px;"
						>
							{container.id}
						</div>
					</td>
					<td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
						<div class="text-gray-900 whitespace-nowrap">
							{container.name}
						</div>
					</td>
					<td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
						<div class="text-gray-900 whitespace-nowrap">
							<!-- Qui puoi visualizzare informazioni specifiche sulla rete o gestirlo in base ai tuoi dati -->
							{Object.keys(container.networks)[0]}
							Host port:{JSON.stringify(Object.values(container.networks)[0][0]['HostPort'])}
						</div>
					</td>
					<td class="px-5 py-3 border-b border-gray-200 bg-white text-sm">
						<button class="btn" on:click={() => addToService(container.name)}>Add</button>
					</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</div>
</Portal>
