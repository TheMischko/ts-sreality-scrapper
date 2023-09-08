import database from "../database";
import {Client} from "pg";

interface DatabaseFlatProvider extends IFlatProvider {
    buildWhereFromFilters(filters: FlatFilter) :string
}

export const databaseFlatProvider = (dbClient:Client):DatabaseFlatProvider => {
    const get = async(filters?: FlatFilter):Promise<Flat[]> => {
        let whereString = filters ? buildWhereFromFilters(filters) : "";
        const query = `SELECT id,title,address,image_url FROM flats${whereString}`
        const result = await dbClient.query(query);

        if(result.rowCount == 0) return [];
        const flats = result.rows.map((row) => ({
            id: row.id,
            title: row.title,
            address: row.address,
            image_url: row.image_url
        }))
        return flats;
    };

    const getPart = async (pageIndex:number, pageSize:number,filters?: FlatFilter):Promise<Flat[]> => {
        const offset = pageIndex * pageSize;
        let whereString = filters ? buildWhereFromFilters(filters) : "";
        const result = await dbClient.query(`SELECT id,title,address,image_url FROM flats${whereString} OFFSET ${offset} LIMIT ${pageSize}`);

        if(result.rowCount == 0) return [];
        const flats = result.rows.map((row) => ({
            id: row.id,
            title: row.title,
            address: row.address,
            image_url: row.image_url
        }))
        return flats;
    };

    const buildWhereFromFilters = (filters: FlatFilter):string => {
        if(!(filters.addressFilters || filters.titleFilters)) return ""

        let whereString = " WHERE"
        let isFirst = true;

        if(filters.addressFilters && filters.addressFilters.length > 0){
            whereString += " (";
            for(const addressFilter of filters.addressFilters){
                if(!isFirst){
                    whereString += " OR";
                } else {
                    isFirst = false;
                }
                whereString += ` address LIKE '%${addressFilter}%'`
            }
            whereString += ")";
        }

        if(filters.titleFilters && filters.titleFilters.length > 0){
            if(!isFirst){
                whereString += " AND"
                isFirst = true;
            }
            whereString += " (";
            for(const titleFilter of filters.titleFilters){
                if(!isFirst){
                    whereString += " OR";
                } else {
                    isFirst = false;
                }
                whereString += ` title LIKE '%${titleFilter}%'`
            }
            whereString += ")";
        }

        return whereString;
    }

    return {
        get,
        getPart,
        buildWhereFromFilters
    }
}