<!-- Conversations.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { socket } from '$lib/client/socket';
	import type { Conversation } from '$lib/types/general';
	import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';

	export let project_name: string;
	let conversations: Conversation[] = [];
	const MAX_CONVERSATIONS = 100;
	let currPage = 1;

	onMount(async () => {
		// TODO fix change page
		const response = await fetch(`${PUBLIC_VITE_BACKEND_URL}/project/conversations?` + new URLSearchParams({
			page: currPage,
			project_name
		}));

		const newConversations: Conversation[] = await response.json();
		addConversation(newConversations);

		socket.on('analyze_pcap', (val: { project_name: string, conversations: string }) => {
				console.log(newConversations);
			if (project_name === val.project_name) {
				const newConversations: Conversation[] = JSON.parse(val.conversations);
				addConversation(newConversations);
			}
		});
	});


	function addConversation(newConversations: Conversation[]) {
		conversations = [...conversations, ...newConversations];
		if (conversations.length > MAX_CONVERSATIONS) {
			conversations = conversations.slice(-MAX_CONVERSATIONS);
		}
	}


	function clearConversations() {
		conversations = [];
	}

	function determineBackgroundColor(type: string): string {
		return type === 'server' ? 'rgba(22, 253, 38, 0.05)' : 'rgba(252, 23, 226, 0.05)';
	}

	function hexToUtf8(hexString) {
		// Rimuovi eventuali spazi e converti la stringa in un array di byte
		const bytes = new Uint8Array(hexString.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16)));

		// Usa TextDecoder per convertire l'array di byte in una stringa UTF-8
		const decoder = new TextDecoder('utf-8');
		return decoder.decode(bytes);
	}
</script>

<div>
	<h1>Conversations for {project_name}</h1>
	<div>
		{#each conversations as conversation, index (index)}
			<h1 class="text-xl">SIUM</h1>
			{#each conversation.message as message}
				<p
					class="break-all whitespace-pre-wrap text-sm inline"
					style="background-color: {determineBackgroundColor(message.sender)}">
					{hexToUtf8(message.message)}
				</p>
			{/each}
		{/each}
	</div>
	<button on:click={clearConversations}>Clear Conversations</button>
</div>
