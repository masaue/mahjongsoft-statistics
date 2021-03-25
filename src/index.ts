import readlineSync from 'readline-sync';

import Scraper from './scraper';

(async () => {
  const login = readlineSync.question('login?');
  const password = readlineSync.questionNewPassword('password?');

  const scraper = new Scraper();
  await scraper.initialize();
  await scraper.statistics(login, password);
})();
