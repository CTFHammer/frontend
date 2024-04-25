const BACKEND_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL

export async function post<T, D>(route: string, data: T): Promise<D | Error> {
  try {
    const response = await fetch(`${BACKEND_URL}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json() as Promise<D>;
  } catch (error) {
    return new Error(error as string)
  }
}
