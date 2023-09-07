import services from "../../src/services";
import { FlatService } from "../../src/services/flatService";
import { mockFlatProvider } from "../mocks/providers/MockFlatProvider";

test("flatService - getFlats - resolves list of flats", async () => {
  const mockFlats = mockFlatProvider();
  const flatsService: FlatService = services.flatService(mockFlats); 

  const flats = await flatsService.getFlats();

  expect(flats.length).toBeGreaterThan(0);
  const attributes = Object.keys(flats[0]);
  expect(attributes).toContain("id");
  expect(attributes).toContain("title");
  expect(attributes).toContain("address");
  expect(attributes).toContain("image_url");
});

test("flatService - getFlats - resolves two different lists when using with paging", async() => {
  const mockFlats = mockFlatProvider();
  const flatsService: FlatService = services.flatService(mockFlats); 
  const pageSize = 2;


  const flatsOne = await flatsService.getFlats({page: 0, itemsPerPage: pageSize});
  const flatsTwo = await flatsService.getFlats({page: 1, itemsPerPage: pageSize});

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
});


test("flatService - getFlats - paging result has the right size", async() => {
  const mockFlats = mockFlatProvider();
  const flatsService: FlatService = services.flatService(mockFlats); 
  const pageSize = 2;

  const flats = await flatsService.getFlats({page: 0, itemsPerPage: pageSize});

  expect(flats.length).toBe(pageSize);
})

test("flatService - getFlats - paging result is empty list on out of bounds page index", async() => {
  const mockFlats = mockFlatProvider();
  const flatsService: FlatService = services.flatService(mockFlats); 
  const pageSize = 2;

  const flats = await flatsService.getFlats({page: Number.MAX_SAFE_INTEGER, itemsPerPage: pageSize});

  expect(flats).toStrictEqual([]);
})