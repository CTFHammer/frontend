import type { CustomError } from '$lib/components/requests';
import type { Project, Settings } from '$lib/types/general';
import { api } from '$lib/client/requests';
import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';
import * as db from '$lib/database';

export async function load({ depends }) {
	depends('app:projects');
	return { settings: (await db.getSettings()) as Settings, projects: await getProjects() };
}

async function getProjects() {
	try {
		return await api<Project[]>(`${PUBLIC_VITE_BACKEND_URL}/project/list`);
	} catch (e) {
		console.error(e);
		error(500, {
			message: 'Projects not load properly',
			code: 'NOT_FOUND'
		});
	}
}
