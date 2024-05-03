import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';

// const BACKEND_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
import { error } from '@sveltejs/kit';

export async function post<T, D>(route: string, data: T): Promise<D | Error> {
	try {
		const response = await fetch(`${PUBLIC_VITE_BACKEND_URL}/${route}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		return (await response.json()) as Promise<D>;
	} catch (error) {
		return new Error(error as string);
	}
}

export async function api<T>(url: string): Promise<T> {
	const response = await fetch(url);
	if (!response.ok) {
		error(404, { code: '404', message: 'Project not found' });
	}

	return await (response.json() as Promise<T>);
}
