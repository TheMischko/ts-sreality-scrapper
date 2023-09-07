import database from "../database";

export interface FlatService {
  getFlats(args?: getFlatsArgs): Promise<Flat[]>
}

type getFlatsArgs = {
  page: number,
  itemsPerPage: number
}

export const flatService = (flatProvider: IFlatProvider): FlatService => {
  /**
   * Selects all flats from database table `flats` and return them.
   * 
   * @returns array of data about flats
   */
  const getFlats = async (args?: getFlatsArgs):Promise<Flat[]> => {
    if(args){
      if(args.page < 0)
        throw Error(`Invalid page index: ${args.page}`);
      if(args.itemsPerPage < 0)
        throw Error(`Invalid number of items per page: ${args.itemsPerPage}`);
      
      return await flatProvider.getPart(args.page, args.itemsPerPage);
    }
    return await flatProvider.get();
    /*
    const db = await database.getClient();
    try{
      const result = await db.query("SELECT id, title, address, image_url FROM flats");
      if(result.rowCount == 0) return [];
      return result.rows;
    } catch{
      return [];
    }*/
  }


  return {
    getFlats
  }
}