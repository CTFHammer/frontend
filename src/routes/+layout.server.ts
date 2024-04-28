import type { CustomError } from '$lib/components/requests';
import * as db from '$lib/server/database';
import type { Settings } from '$lib/types/general';
import { api } from '$lib/client/requests';
import type { Project } from './[project]/store';
import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export async function load() {
	return { settings: db.getSettings(), projects: await getProjects() };
}

async function getProjects() {
	try {
		return await api<Project>(`${PUBLIC_VITE_BACKEND_URL}/project/list`);
	} catch (e) {
		console.log(e);
		error(500, {
			message: 'Project not load properly',
			code: 'NOT_FOUND'
		});
	}
}
