import { navigating } from '$app/stores';
import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export async function load({ url, fetch, params, depends }) {
	depends('app:project');
	const res = await fetch(`${PUBLIC_VITE_BACKEND_URL}/project/get-project/${params.project}`);
	if (!res.ok) {
		error(404, {
			message: 'Covnersations not load properly',
			code: 'NOT_FOUND'
		});
	}
	const project = await res.json();

	return {
		project
	};
}
