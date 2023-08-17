import puppeteer, { Page } from "puppeteer";

/**
 * URL address to the starting where the first flats from sreality.cz website are.
 */
const SREALITY_URL = 'https://www.sreality.cz/en/search/for-sale/apartments?page=1';


/**
 * Gets data from all flats on current sreality page.
 * 
 * @param page 
 * @returns array of scrapped flats
 */
const getFlatsOnPage = async (page: Page):Promise<ScrappedFlat[]> => {
  const flats:ScrappedFlat[] = await page.evaluate(() => {
    // Select all wrapper divs for listed flats
    const flatsHTML = document.querySelectorAll(".dir-property-list > div");

    const flats:ScrappedFlat[] = [];

    flatsHTML.forEach((flat) => {
      const title = flat.querySelector("a .name")?.textContent;
      const address = flat.querySelector(".locality")?.textContent;
      const image_url = flat.querySelector('[component="property-carousel"]')?.querySelectorAll("a > img")[1]?.getAttribute("src");
      if(!title || !address || !image_url) return;
      flats.push(
        {title, address, image_url}
      );
    });

    return flats;
  });

  console.log(`number of scrapped flats = ${flats.length}`);
  return flats;
}


/**
 * Turns array of scrapped flats object to single SQL insert script.
 * 
 * @param flats array of scrapped flats
 * @returns SQL insert string
 */
const createSQLInsert = (flats:ScrappedFlat[]):string => {
  if(flats.length === 0) return ""
  let statement = "TRUNCATE flats;\nINSERT INTO\n\tflats (title, address, image_url)\nVALUES"

  for(const flat of flats){
    statement += `\n\t('${flat.title}', '${flat.address}', '${flat.image_url}'),`
  }
  statement = statement.replace(/.$/,';');

  return statement;
}


/**
 * Connects to sreality.cz and via Puppeteer scrape all flats information until there are 500 flat's.
 * 
 * @returns insert script of first 500 flats on sreality website
 */
export const ScrapeAndCreateSQL = async ():Promise<string> => {
  console.log("scrapping");
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(SREALITY_URL);

  let flats:ScrappedFlat[] = [];

  let maxCounter = 200;
  while(flats.length < 500 || maxCounter <= 0){
    let flatsCurrent = await getFlatsOnPage(page);
    flats.push(...flatsCurrent);
    // Click until button dissappears
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          const button = document.querySelector('.paging-full .btn-paging-pn.paging-next');
          if (button !== null) {
            // @ts-ignore
            button.click();
          } else {
            clearInterval(interval);
            resolve(true);
          }
        }, 200);
      });
    });
    await page.waitForNetworkIdle();
    console.log(page.url());
    maxCounter--;
  }

  return createSQLInsert(flats);
}