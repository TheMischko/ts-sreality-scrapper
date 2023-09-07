import providers from "../../src/providers";
import database from "../../src/database";

test("databaseFlatProvider - database is running", async () => {
    expect(async () => await database.getClient()).not.toThrow(Error);
});

test("NODE_ENV is local", async () => {
    expect(process.env.NODE_ENV).toBe("local");
});

test("databaseFlatProvider - get - returns some valid data", async () => {
    const client = await database.getClient()
    const flatProvider = providers.databaseFlatProvider(client);
    const flats = await flatProvider.get();
    expect(flats.length).toBeGreaterThan(0);
    expect(flats[0].id).not.toBe(undefined);
    expect(flats[0].address).not.toBe(undefined);
    expect(flats[0].title).not.toBe(undefined);
    expect(flats[0].image_url).not.toBe(undefined);

}, 30000);