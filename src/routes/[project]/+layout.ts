import { navigating } from '$app/stores';
import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export async function load({ url, fetch, params }) {
	const res = await fetch(`${PUBLIC_VITE_BACKEND_URL}/project/get-project/${params.project}`);
	if (!res.ok) {
		throw new error(500, {
			message: 'Server error',
			code: 500
		});
	}
	const project = await res.json();
	return {
		project
	};
}
