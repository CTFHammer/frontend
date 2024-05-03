import { customStore } from '$lib/store';
import type { Project } from '$lib/types/general';
import { writable } from 'svelte/store';

export const projectStore = writable<Project>({ id: '', name: '', port: 0 });
