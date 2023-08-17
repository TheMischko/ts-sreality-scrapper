# Website displaying scrapped data about available flats

### How to use
1. Clone the repository
2. Start docker containers in root folder by: 
```bash
docker-compose up
```
3. Open [localhost:8080](https://localhost:8080) in any web browser.

### Frontend
- Displays data about 500 flats (name, address, image).
- Contains paginator for basic navigation between flats.
- Written in [React](https://react.dev) using Typescript.
- UI made out of [Chakra library](https://chakra-ui.com).

### Backend
- Provides data about flats from database via REST API.
  - Flats in JSON format are available via ```/flats``` endpoint.
- Enables to scrape [sreality.cz](sreality.cz/en/search/for-sale/apartments?page=1) via ```/scrape``` endpoint.
- Runs on [Express.JS library](https://expressjs.com) with Typescript.
- Webscrapping was done mainly via [Puppeteer](https://pptr.dev) because of the Client-based nature of the site.

### Database
- Runs on [PostgreSQL](https://www.postgresql.org) engine.