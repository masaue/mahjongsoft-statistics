import Scraper from './scraper';

export default class Records {
  /*
  records = [
    {
      begtime: '2020-11-03 14:46:30',
      finished: '1',
      id: '11289',
      games: '8',
      starttime: '03.11.2020 14:46:30',
      secs: '2103',
      gp0: '115',
      gp1: '51',
      gp2: '-82',
      gp3: '-84',
      penalty0: '0',
      penalty1: '0',
      penalty2: '0',
      penalty3: '0',
      tp0: '4.00',
      tp1: '2.00',
      tp2: '1.00',
      tp3: '0.00',
      player0: 'masaue',
      player1: 'evza888',
      player2: 'HSbrowny',
      player3: 'Cicadawn',
      country0: 'jp',
      country1: 'ru',
      country2: 'nl',
      country3: 'jp',
      duration: '0:35:03'
    }
  ]
   */
  private records?: {}[];

  constructor(private readonly login: string) {
  }

  async initialize() {
    this.records = this.records || await this.scrape();
  }

  rankCount(rank: number) {
    const key = `player${rank - 1}`;
    return this.records?.filter((record) => { return record[key] === this.login; }).length || 0;
  }

  get length() {
    return this.records?.length || 0;
  }

  private async scrape() {
    const scraper = new Scraper();
    await scraper.initialize();
    const records = await scraper.statistics(this.login);
    scraper.close();
    return records;
  }
}
