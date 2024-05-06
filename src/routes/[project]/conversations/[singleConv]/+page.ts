import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';

export async function load({ url, fetch, params }) {
	const res = await fetch(`${PUBLIC_VITE_BACKEND_URL}/conversations/${params.singleConv}`);
	if (!res.ok) {
	}
	const conversations = await res.json();
	return {
		single_conv: conversations
	};
}
