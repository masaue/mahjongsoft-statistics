import { Command } from 'commander';

import Records from './records';
import Statistics from './statistics';
import { version } from '../package.json';

(async () => {
  const program = new Command();
  program
    .version(version, '-v, --ver', 'output the version number')
    .usage('[options] login')
    .option('--force-scrape', 'force scrape')
    .parse(process.argv);
  if (program.args.length !== 1) {
    program.outputHelp({ error: true });
    process.exit(1);
  }

  const { forceScrape } = program.opts();
  const records = new Records(program.args[0], forceScrape);
  await records.initialize();

  const statistics = new Statistics(records);
  statistics.show();
})();
