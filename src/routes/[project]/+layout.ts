import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';

export async function load({ url, fetch }) {
	const res = await fetch(`${PUBLIC_VITE_BACKEND_URL}/project/get-project${url.pathname}`);
	const project = await res.json();
	return {
		project: project
	};
}
