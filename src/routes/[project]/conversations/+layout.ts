import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export async function load({ url, fetch, params }) {
	const res = await fetch(`${PUBLIC_VITE_BACKEND_URL}/conversations/get-first/${params.project}`);
	if (!res.ok) {
		error(404, {
			message: 'Covnersations not load properly',
			code: 'NOT_FOUND'
		});
	}
	const conversations = await res.json();
	return {
		conversations
	};
}
