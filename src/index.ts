import readlineSync from 'readline-sync';

import Scraper from './scraper';

(async () => {
  const login = readlineSync.question('login?');

  const scraper = new Scraper();
  await scraper.initialize();
  await scraper.statistics(login);
  scraper.close();
})();
