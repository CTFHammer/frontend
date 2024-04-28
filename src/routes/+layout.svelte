<script lang="ts">
	import './app.css';
	import type { LayoutData } from './$types';
	import { storeSetting } from '$lib/store';
	import SelectService from '$lib/components/SelectService.svelte';

	export let data: LayoutData;


	storeSetting.initStore(data as any);
</script>

<div class="bg-yellow-400 bg-opacity-10 min-h-screen flex flex-col">
	<div class="flex bg-white py-4 px-10 align-middle items-center sticky top-0">
		<div class="flex-1">
			<SelectService projects={data.projects} />
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
