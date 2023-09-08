import express from "express";
import services from "../services";
import providers from "../providers";
import database from "../database";

const router = express.Router();

const itemsPerPage = 25;


router.get("/:page", async (req, res) => {
    try {
        const dbClient = await database.getClient();
        const flatProvider = providers.databaseFlatProvider(dbClient)
        const routerService = services.flatService(flatProvider);

        const page:number = Number.parseInt(req.params["page"]) ?? 0;

        const flats = await routerService.getFlats({page, itemsPerPage});
        res.status(200).send(flats);
    } catch (err:any){
        res.status(500).send(err.message);
    }
});

router.get("/maxPages", async (req, res) => {
    const dbClient = await database.getClient();
        const flatProvider = providers.databaseFlatProvider(dbClient)
        const routerService = services.flatService(flatProvider);

        const flats = await routerService.getFlats();

        const pages = Math.ceil(flats.length / itemsPerPage);
        res.status(200).send({pages});
})

export default router;