
import { PUBLIC_VITE_BACKEND_URL } from "$env/static/public";
import { api } from "$lib/client/requests";
import { CustomError } from "$lib/components/requests";
import type { Settings } from "$lib/types/general";


export function getSettings(): Promise<Settings | CustomError> { 
  return api<Settings>(`${PUBLIC_VITE_BACKEND_URL}/settings`);
}


