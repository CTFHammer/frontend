<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const { project } = data;
</script>

<div class="flex-1 flex">
	<aside class="p-5 w-1/5 bg-white border-r overflow-auto max-h-[calc(100vh-75px)]">
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
