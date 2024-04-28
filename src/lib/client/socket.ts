import { PUBLIC_VITE_BACKEND_URL } from '$env/static/public';
import { io } from 'socket.io-client';

const socket = io(PUBLIC_VITE_BACKEND_URL);

export { socket };
