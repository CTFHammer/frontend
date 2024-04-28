import { PUBLIC_VITE_BACKEND_URL } from "$env/static/public"
import { api } from "$lib/client/requests"

export class CustomError{
  message: string
  status?: string
  code: number | string
  error = true

  constructor(message: string, code: number | string){
    this.message = message
    this.code = code
    return {error: true, message, code}
  }
}

interface NetworkPort {
  HostPort: string;
}

interface Networks {
  [networkName: string]: NetworkPort[];
}

export interface getListContainerResponse {
  id: string;
  name: string;
  networks: Networks;
}

const BACKEND_URL = PUBLIC_VITE_BACKEND_URL

export function getListContainer(): Promise<getListContainerResponse[] | CustomError> { 
  return api<getListContainerResponse[]>(`${BACKEND_URL}/docker/list`);
}

