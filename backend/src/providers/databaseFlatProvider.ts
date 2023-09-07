import database from "../database";
import {Client} from "pg";

export const databaseFlatProvider = (dbClient:Client):IFlatProvider => {
    const get = async():Promise<Flat[]> => {
        const result = await dbClient.query("SELECT id,title,address,image_url FROM flats");

        if(result.rowCount == 0) return [];
        const flats = result.rows.map((row) => ({
            id: row.id,
            title: row.title,
            address: row.address,
            image_url: row.image_url
        }))
        return flats;
    };
    const getPart = async (pageIndex:number, pageSize:number):Promise<Flat[]> => {
        return [];
    };

    return {
        get,
        getPart
    }
}