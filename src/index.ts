import readlineSync from 'readline-sync';

import Records from './records';
import Statistics from './statistics';

(async () => {
  const login = readlineSync.question('login?');

  const records = new Records(login);
  await records.initialize();

  const statistics = new Statistics(records);
  statistics.show();
})();
