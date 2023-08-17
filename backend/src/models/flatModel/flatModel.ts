import database from "../../database"

/**
 * Selects all flats from database table `flats` and return them.
 * 
 * @returns array of data about flats
 */
const getFlats = async ():Promise<any[]> => {
  const db = await database.getClient();
  try{
    const result = await db.query("SELECT id, title, address, image_url FROM flats");
    if(result.rowCount == 0) return [];
    return result.rows;
  } catch{
    return [];
  }
}

export default {
  getFlats
}