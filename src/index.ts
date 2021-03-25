import Scraper from './scraper';

(async () => {
  const scraper = new Scraper();
  await scraper.initialize();
  await scraper.statistics();
})();
