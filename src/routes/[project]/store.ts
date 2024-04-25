import { customStore } from "$lib/store";
import { writable } from "svelte/store";

export interface Project{
  name: string
  pcapFiles: string[]
}

export const projectStore = writable<Project>({name: "", pcapFiles: []})

