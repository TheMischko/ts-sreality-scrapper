import express from "express";
import services from "../services";
import providers from "../providers";
import database from "../database";

const router = express.Router();


router.get("/", async (req, res) => {
    console.log("GET");
    try {
        const dbClient = await database.getClient();
        const flatProvider = providers.databaseFlatProvider(dbClient)
        const routerService = services.flatService(flatProvider);
        const flats = await routerService.getFlats();
        res.send(flats);
    } catch (err:any){
        res.send(err.message);
    }
})

export default router;