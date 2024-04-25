<script lang="ts">
	import Input from '$lib/components/input.svelte';
	import { post } from '$lib/client/requests';
	import type { Settings } from '$lib/types/general';

	import { storeSetting } from '$lib/store';

	let regexFlag: string | null;
	let stringToTest = '';
	let result = false;
	let reCheck: RegExp;

	function updateRegex(event: CustomEvent<any>) {
		regexFlag = event.detail.value;
		if (regexFlag) reCheck = new RegExp(regexFlag);
	}

	function checkRegex(event: CustomEvent<any>) {
		stringToTest = event.detail.value;
		result = reCheck.test(stringToTest);
	}

	function save() {
		if (regexFlag)
			post<Settings, { saved: Settings }>('settings', { regexFlag }).then((res) => {
				console.log(res.saved);

				if (res.saved) {
					storeSetting.setStore(res.saved);
				}
			});
	}

	storeSetting.store.subscribe((setting) => {
		regexFlag = setting.regexFlag;
		if (regexFlag) reCheck = new RegExp(regexFlag);
	});
</script>

<div class="p-5">
	<h1 class="font-bold text-lg">Hello in CTF Hammer</h1>

	<div class="max-w-md">
		<label for="flag-regex">Set your flag regex</label>
		<Input prefix="/" suffix="/" on:inputChange={updateRegex} value={regexFlag} />
		<label for="">Test your regex below</label>
		<Input on:inputChange={checkRegex} />
		<p>test: {result}</p>
		<button class="btn" on:click={save}>Save</button>
	</div>
</div>
