import providers from "../../src/providers";
import database from "../../src/database";
import { Client } from "pg";
import { getStringSimilarity } from "../utils";


test("NODE_ENV is test", async () => {
    expect(process.env.NODE_ENV).toBe("test");
});

test("databaseFlatProvider - database is running", async () => {
    await expect(async () => {
        await database.connect();
        const client = await database.getClient();
    }).resolves;
});


/**
 * 
 * get
 * 
 */

test("databaseFlatProvider - get - returns some valid data", async () => {
    await database.connect();
    const client = await database.getClient()
    const flatProvider = providers.databaseFlatProvider(client);
    const flats = await flatProvider.get();
    expect(flats.length).toBeGreaterThan(0);
    expect(flats[0].id).not.toBe(undefined);
    expect(flats[0].address).not.toBe(undefined);
    expect(flats[0].title).not.toBe(undefined);
    expect(flats[0].image_url).not.toBe(undefined);
}, 10000);


/**
 * 
 * getPart
 * 
 */


test("databaseFlatProvider - getPart - returns some valid data", async () => {
    await database.connect();
    const client = await database.getClient()
    const flatProvider = providers.databaseFlatProvider(client);
    const flats = await flatProvider.getPart(0, 5);
    expect(flats.length).toBeGreaterThan(0);
    expect(flats[0].id).not.toBe(undefined);
    expect(flats[0].address).not.toBe(undefined);
    expect(flats[0].title).not.toBe(undefined);
    expect(flats[0].image_url).not.toBe(undefined);
}, 10000);


test("databaseFlatProvider - getPart - returns different data for two calls", async () => {
    await database.connect();
    const client = await database.getClient()
    const flatProvider = providers.databaseFlatProvider(client);
    const flatsOne = await flatProvider.getPart(0, 2);
    const flatsTwo = await flatProvider.getPart(1, 2);

    let hasSameRecord = false;
    for(const flatOne of flatsOne){
        if(hasSameRecord){
            break;
          }
          for(const flatTwo of flatsTwo){
            if(flatOne.id === flatTwo.id){
              hasSameRecord = true;
              break;
            }
          }
    }

    expect(hasSameRecord).toBe(false);
    
}, 10000);


test("databaseFlatProvider - getPart - returns data with correct size", async () => {
    const pageSize = 4;
    await database.connect();
    const client = await database.getClient()
    const flatProvider = providers.databaseFlatProvider(client);
    const flats = await flatProvider.getPart(0, pageSize);

    expect(flats.length).toBe(pageSize);
}, 10000);

test("databaseFlatProvider - getPart - data overlap if indexes overlap", async () => {
    const pageSize = 4;
    await database.connect();
    const client = await database.getClient()
    const flatProvider = providers.databaseFlatProvider(client);
    const flatsOne = await flatProvider.getPart(0, 4); //0,1,2,3
    const flatsTwo = await flatProvider.getPart(1, 2); //2,3

    expect(flatsOne[flatsOne.length-1].id).toBe(flatsTwo[flatsTwo.length-1].id);
}, 10000);


/**
 * 
 * buildWhereFromFilters
 * 
 */


test("databaseFlatProvider - buildWhereFromFilters - returns string", async () => {
    await database.connect();
    const client = await database.getClient()
    const provider = providers.databaseFlatProvider(client);

    const result = provider.buildWhereFromFilters({
        titleFilters: ["1+kk"]
    });

    expect(typeof result).toBe("string");
});

test("databaseFlatProvider - buildWhereFromFilters - can build where for one title", async () => {
    await database.connect();
    const client = await database.getClient()
    const provider = providers.databaseFlatProvider(client);

    const result = provider.buildWhereFromFilters({
        titleFilters: ["1+kk"]
    });
    const expectedResult = "WHERE (title LIKE '%1+kk%')";

    expect(getStringSimilarity(result, expectedResult)).toBeGreaterThan(0.9);
});

test("databaseFlatProvider - buildWhereFromFilters - can build where for three titles", async () => {
    await database.connect();
    const client = await database.getClient()
    const provider = providers.databaseFlatProvider(client);

    const result = provider.buildWhereFromFilters({
        titleFilters: ["1+kk", "1+1", "2+kk"]
    });
    const expectedResult = "WHERE (title LIKE '%1+kk%' OR title LIKE '%1+1%' OR title LIKE '%2+kk%')";

    expect(getStringSimilarity(result, expectedResult)).toBeGreaterThan(0.95);
});

test("databaseFlatProvider - buildWhereFromFilters - can build where for single address", async () => {
    await database.connect();
    const client = await database.getClient()
    const provider = providers.databaseFlatProvider(client);

    const result = provider.buildWhereFromFilters({
        addressFilters: ["Holešovice"]
    });
    const expectedResult = "WHERE (address LIKE '%Holešovice%')";

    expect(getStringSimilarity(result, expectedResult)).toBeGreaterThan(0.9);
});

test("databaseFlatProvider - buildWhereFromFilters - can build where for three addresses", async () => {
    await database.connect();
    const client = await database.getClient()
    const provider = providers.databaseFlatProvider(client);

    const result = provider.buildWhereFromFilters({
        addressFilters: ["Holešovice", "Praha", "23224"]
    });
    const expectedResult = "WHERE (address LIKE '%Holešovice%' OR address LIKE '%Praha%' OR address LIKE '%23224%')";

    expect(getStringSimilarity(result, expectedResult)).toBeGreaterThan(0.95);
});

test("databaseFlatProvider - buildWhereFromFilters - can build where for single address and single title", async () => {
    await database.connect();
    const client = await database.getClient()
    const provider = providers.databaseFlatProvider(client);

    const result = provider.buildWhereFromFilters({
        addressFilters: ["Holešovice"],
        titleFilters: ["1+kk"]
    });
    const expectedResult = "WHERE (address LIKE '%Holešovice%') AND (title LIKE '%1+kk%')";
    expect(getStringSimilarity(result, expectedResult)).toBeGreaterThan(0.95);
});

test("databaseFlatProvider - buildWhereFromFilters - can build where for three addresses and three titles", async () => {
    await database.connect();
    const client = await database.getClient()
    const provider = providers.databaseFlatProvider(client);

    const result = provider.buildWhereFromFilters({
        addressFilters: ["Holešovice", "Praha", "23224"],
        titleFilters: ["1+kk", "1+1", "2+kk"]
    });
    const expectedResult = "WHERE (address LIKE '%Holešovice%' OR address LIKE '%Praha%' OR address LIKE '%23224%') AND (title LIKE '%1+kk%' OR title LIKE '%1+1%' OR title LIKE '%2+kk%')";
    expect(getStringSimilarity(result, expectedResult)).toBeGreaterThan(0.95);
});

/**
 * 
 * Integration tests
 * 
 */

test("databaseFlatProvider - get - with address filter returns correct results", async () => {
    const addresses = ["Vinohradská"]
    const filters: FlatFilter = {
        addressFilters: addresses
    }

    await database.connect();
    const client = await database.getClient()
    const flatProvider = providers.databaseFlatProvider(client);
    const flats = await flatProvider.get(filters);

    expect(flats.length).toBeGreaterThan(0);
    expect(flats[0].address.includes(addresses[0])).toBeTruthy();
});

test("databaseFlatProvider - get - with address filter and title returns correct results", async () => {
    const addresses = ["Vinohradská"];
    const titles = ["3+1"];

    const filters: FlatFilter = {
        addressFilters: addresses,
        titleFilters: titles
    }

    await database.connect();
    const client = await database.getClient()
    const flatProvider = providers.databaseFlatProvider(client);
    const flats = await flatProvider.get(filters);

    expect(flats.length).toBeGreaterThan(0);
    expect(flats[0].address.includes(addresses[0])).toBeTruthy();
    expect(flats[0].title.includes(titles[0])).toBeTruthy();
});

