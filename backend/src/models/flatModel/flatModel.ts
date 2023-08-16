import database from "../../database"


const getFlats = async () => {
  const db = await database.getClient();
  try{
    const result = await db.query("SELECT id, title, address, image_url FROM flats");
    if(result.rowCount == 0) return [];
    return result.rows;
  } catch{
    return [];
  }
}

const insertFlats = async(title:string, image_url:string) => {
  const db = await database.getClient();
  await db.query(`INSERT INTO flats (title, image_url) VALUES (${title}, ${image_url})`);
}

export default {
  getFlats
}