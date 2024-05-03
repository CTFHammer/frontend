<script lang="ts">
	import Input from '$lib/components/input.svelte';
	import { post } from '$lib/client/requests';
	import type { Settings } from '$lib/types/general';

	import { storeSetting } from '$lib/store';
	import Single from '$lib/components/layouts/single.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

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

<div class="mx-auto w-[72em]">
	<Single>
		<h1 slot="title" class="">Hello in CTF Hammer</h1>

		<div>
			<div class="flex max-w-md flex-col gap-5">
				<div>
					<Input
						prefix="/"
						suffix="/"
						on:inputChange={updateRegex}
						value={regexFlag}
						label="Set you regex flag"
					/>
				</div>

				<div>
					<Input on:inputChange={checkRegex} label="Test you regex" />
					<p class="my-2">Test result: {result ? '😀' : '😔'}</p>
				</div>
				<button class="btn btn-out" on:click={save}>Save</button>
			</div>
		</div>
	</Single>

	<Single>
		<h1 slot="title">Your Current projects</h1>

		<div class="flex flex-wrap gap-3">
			{#each data.projects as project}
				<a
					href={project.name}
					class="dark:border-dark-yellow-400 dark:bg-dark-yellow-400 flex flex-col rounded border p-5"
				>
					<span>Name: <span class="inline-pre">{project.name}</span></span>
				</a>
			{/each}
		</div>
	</Single>
</div>
