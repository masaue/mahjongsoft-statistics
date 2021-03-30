import readlineSync from 'readline-sync';

import Scraper from './scraper';
import Statistics from './statistics';

(async () => {
  const login = readlineSync.question('login?');

  const scraper = new Scraper();
  await scraper.initialize();
  const records = await scraper.statistics(login);
  scraper.close();

  const statistics = new Statistics(login, records);
  statistics.show();
})();
