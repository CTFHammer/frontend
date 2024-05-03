import type { CTFNotification } from '$lib/types/general';
import { writable } from 'svelte/store';

export const OBSnotification = writable<CTFNotification[]>([]);

export function addNotification(notification: CTFNotification) {
	const newNotification: CTFNotification = {
		...notification,
		id: Math.random().toString(36).substring(2)
	};
	OBSnotification.update((all) => [...all, newNotification]);

	// remove notification
	setTimeout(() => {
		OBSnotification.update((all) => all.filter((n) => n.id !== newNotification!.id));
	}, 3000);
}