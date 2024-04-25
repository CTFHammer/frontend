import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
import { CustomError, api } from '$lib/components/requests';
import type { Project } from './store';
import { error } from '@sveltejs/kit';

export async function load({ params }): Promise<any> {
	const { project } = params;
	try {
		const projectResponse = await api<Project>(
			`${PUBLIC_VITE_BACKEND_URL}/project/get-project/${project}`
		);
		return {
			project: projectResponse
		};
	} catch {
		console.log('qui');
		error(404, { code: '404', message: 'Project not found' });
	}
}
