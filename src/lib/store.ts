import { writable, type Readable, type Writable } from 'svelte/store';
import type { Settings } from '$lib/types/general';

export class customStore<T>{
  store!:  Writable<T>


  initStore(settings: T){
    this.store = writable(settings);
  }

  getStore(){
    return this.store
  }

  setStore(data: T){
    this.store.set(data)
  }

  delete(){
  }

}

export const storeSetting = new customStore<Settings>()