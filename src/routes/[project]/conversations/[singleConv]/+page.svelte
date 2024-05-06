<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let single = data.single_conv;
	console.log(single);

	function hex2a(hexx: string) {
		var hex = hexx.toString(); //force conversion
		var str = '';
		for (var i = 0; i < hex.length; i += 2)
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		return str;
	}

	function isServer(type) {
		switch (type) {
			case 'server':
				return 'bg-red-500';

			case 'client':
				return 'bg-blue-500';
		}
	}
</script>

<span class="text-lg font-bold">Message</span>
<div>
	{#each single.message as mess}
		<p class="{isServer(mess.sender)} bg-opacity-20">
			{hex2a(mess.message)}
		</p>
	{/each}
</div>
