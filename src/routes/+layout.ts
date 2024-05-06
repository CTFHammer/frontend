import type { CustomError } from '$lib/components/requests';
import type { Project, Settings } from '$lib/types/general';
import { api } from '$lib/client/requests';
import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
import { error, redirect } from '@sveltejs/kit';
import * as db from '$lib/database';
import { goto } from '$app/navigation';

export async function load({ depends }) {
	depends('app:projects');
	depends('app:settings');
	const res = await fetch(`${PUBLIC_VITE_BACKEND_URL}/check-vul`);

	const settingsRes = await fetch(`${PUBLIC_VITE_BACKEND_URL}/settings`);

	let settings: Settings;
	try {
		settings = await settingsRes.json();
	} catch (e) {
		settings = {};
		// error(404, {
		// 	message: 'Settings not founds',
		// 	code: 'NOT_FOUND'
		// });
	}

	return {
		settings: settings,
		projects: await getProjects(),
		statusVul: await res.json()
	};
}

async function getProjects() {
	try {
		return await api<Project[]>(`${PUBLIC_VITE_BACKEND_URL}/project/list`);
	} catch (e) {
		error(500, {
			message: 'Projects not load properly',
			code: 'NOT_FOUND'
		});
	}
}
