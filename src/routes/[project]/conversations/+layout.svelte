<script lang="ts">
	import Single from '$lib/components/layouts/single.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let conversations = data.conversations;
</script>

<Single>
	<span slot="title">All the conversations</span>

	<div class="flex min-h-screen gap-2">
		<div class="w-1/4 flex gap-2 flex-col">
			{#each conversations as con}
				<a
					href="/{data.project.name}/conversations/{con['_id']['$oid']}"
					class="py-2 px-3 border dark:border-dark-yellow-400"
				>
					<span>{con['timestamp']}</span>
				</a>
			{/each}
		</div>
		<div class="w-3/4"><slot /></div>
	</div>
</Single>
