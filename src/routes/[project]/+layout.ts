import { navigating } from '$app/stores';
import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export async function load({ url, fetch }) {
	const res = await fetch(`${PUBLIC_VITE_BACKEND_URL}/project/get-project${url.pathname}`);
	if (!res.ok) {
		throw error(404, {
			message: 'Not found',
			code: 'NOT_FOUND'
		});
	}
	const project = await res.json();
	return {
		project
	};
}
