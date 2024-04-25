import type { CustomError } from "$lib/components/requests";
import * as db  from "$lib/server/database"
import type { Settings } from "$lib/types/general";



export async function load():Promise<Settings | CustomError>{
    return db.getSettings()
}