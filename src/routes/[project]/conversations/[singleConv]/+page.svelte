<script lang="ts">
	import { parseDate } from '$lib/date';
	import type { Conversation } from '$lib/types/general';
	import type { PageData } from './$types';

	export let data: PageData;

	let single: Conversation = data.single_conv;
	$: if (data && data.project) {
		single = data.single_conv;
	}

	function hex2a(hexx: string) {
		const hex = hexx.toString();
		const bytes = new Uint8Array(hex.length / 2);

		for (let i = 0; i < bytes.length; i++) {
			bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
		}

		const decoder = new TextDecoder('utf-8');
		const str = decoder.decode(bytes);
		return str;
	}

	function isServer(type: 'server' | 'client') {
		switch (type) {
			case 'server':
				return 'bg-red-500';

			case 'client':
				return 'bg-blue-500';
		}
	}

	function haveFlag(message: Conversation['message'][0]) {
		const mess = message.converted ? message.message : hex2a(message.message);
		const reCheck = new RegExp(data.settings.regexFlag);

		const result = reCheck.test(mess);
		return result ? 'underline font-bold' : '';
	}
</script>

<p class="text-lg font-bold">Message</p>
<div class="flex flex-col gap-2 items-start">
	<p class="inline-pre">Analyzed: {parseDate(single.timestamp)}</p>
	<p class="inline-pre">Tag: {single.flag_tag}</p>
	<p class="inline-pre">Current regex: /{data.settings.regexFlag}/</p>
</div>

<div
	class="font-mono tracking-tighter p-3
        border my-3 rounded-lg
        dark:border-dark-yellow-400"
>
	<div class="mb-3">
		<span
			>Legend:
			<span class="{isServer('client')} bg-opacity-20">client</span>
			<span class="{isServer('server')} bg-opacity-20">server</span>
		</span>
	</div>

	{#each single.message as mess}
		<p class="{isServer(mess.sender)} bg-opacity-20 {haveFlag(mess)}">
			{mess.converted ? mess.message : hex2a(mess.message)}
		</p>
	{/each}
</div>
