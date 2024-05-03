<script lang="ts">
	import { type CTFNotification, CTFNotificationType } from '$lib/types/general';
	import { fade, fly } from 'svelte/transition';
	import { attachToBody } from '../Portal/logic';
	import { OBSnotification } from './notificationStore';

	let allNotification: CTFNotification[] = [];

	OBSnotification.subscribe((val) => {
		allNotification = val;
	});

	function getType(notificationType: CTFNotificationType) {
		switch (notificationType) {
			case CTFNotificationType.success:
				return 'bg-green-600';
			case CTFNotificationType.error:
				return 'bg-red-600';
		}
	}
</script>

<div
	class="fixed bottom-0 right-9 z-50 flex w-[400px] flex-col gap-2 overflow-hidden pb-5 text-white"
	use:attachToBody
>
	<!-- <div in:fly={{ y: 100, duration: 100 }} out:fade={{ duration: 100 }}>
		<div
			class="flex rounded {getType(CTFNotificationType.success)} border dark:border-dark-yellow-400"
		>
			<div class="w-1"></div>
			<div class="flex flex-1 flex-col bg-dark-yellow-600 p-3 pl-5">
				<span class="text-sm font-bold">prova</span>
				<p class="text-sm">Test</p>
			</div>
		</div>
	</div> -->
	{#each allNotification as notification (notification.id)}
		<div in:fly={{ y: 100, duration: 100 }} out:fade={{ duration: 100 }}>
			<div class="flex rounded {getType(notification.type)} border dark:border-dark-yellow-400">
				<div class="w-1"></div>
				<div class="flex flex-1 flex-col bg-dark-yellow-600 p-3 pl-5">
					<span class="text-sm font-bold">{notification.title}</span>
					<p class="text-sm">{notification.message}</p>
				</div>
			</div>
		</div>
	{/each}
</div>
