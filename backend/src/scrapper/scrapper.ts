import puppeteer, { Page } from "puppeteer";


const url = 'https://www.sreality.cz/en/search/for-sale/apartments?page=1';

const getFlatsOnPage = async (page: Page):Promise<ScrappedFlat[]> => {
  // iterate
  const flats:ScrappedFlat[] = await page.evaluate(() => {
    // Select all wrapper divs for listed properties
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

  console.log(`num flats: ${flats.length}`);
  return flats;
}


const createSQLInsert = (flats:ScrappedFlat[]):string => {
  if(flats.length === 0) return ""
  let statement = "TRUNCATE flats;\nINSERT INTO\n\tflats (title, address, image_url)\nVALUES"

  for(const flat of flats){
    statement += `\n\t('${flat.title}', '${flat.address}', '${flat.image_url}'),`
  }
  statement = statement.replace(/.$/,';');

  return statement;
}




export const scrapeSReality = async () => {
  console.log("scrapping");
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  let flats:ScrappedFlat[] = [];

  let maxCounter = 100;
  while(flats.length < 50 || maxCounter <= 0){
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

  console.log(flats);
  console.log(flats.length);
  return createSQLInsert(flats);
}