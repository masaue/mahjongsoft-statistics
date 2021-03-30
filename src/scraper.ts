import puppeteer from 'puppeteer';

export default class Scraper {
  private readonly TARGET = 'https://mahjongsoft.com/sessions.php';
  private readonly SCRIPT = 'https://mahjongsoft.com/_sessions.php';
  private readonly LOGIN = '_login.php';
  private browser!: puppeteer.Browser;
  private page!: puppeteer.Page;

  async initialize(): Promise<void> {
    this.browser = await puppeteer.launch();
    const pages = await this.browser.pages();
    [this.page] = pages;
    await this.gotoTarget();
  }

  async statistics(login: string, password: string): Promise<void> {
    await this.login(login, password);
    const records = await this.records(login);
    console.log(records);
  }

  close() {
    this.browser.close();
  }

  private async gotoTarget() {
    await Promise.all([
      this.page.waitForResponse(this.SCRIPT),
      this.page.goto(this.TARGET),
    ]);
  }

  private async login(login: string, password: string) {
    const query = `login=${login}&password=${password}&rememberme=0`;
    await this.put(this.LOGIN, query);
  }

  private async records(login: string) {
    const query = Scraper.recordsSomeOneQuery(login, 0);
    const { numrecords, records } = await this.put(this.SCRIPT, query);
    const offsets = Array(Math.floor(numrecords / 50))
      .fill(0)
      .map((_, index) => { return (index + 1) * 50; });
    return records.length === 0 ? records : [...records,
      ...(await this.recordsWithOffsets(login, offsets)).flat()];
  }

  private async recordsWithOffsets(login: string, offsets: number[]) {
    const sessions = await Promise.all(offsets.map((offset) => {
      const query = Scraper.recordsSomeOneQuery(login, offset);
      return this.put(this.SCRIPT, query);
    }));
    return sessions.map((session) => { return session.records; });
  }

  private static recordsSomeOneQuery(login: string, offset: number) {
    return `offset=${offset}&limit=50&order=1&needrecords=1&type=MCR&order=1&maxbots=2&with=${login}`;
  }

  private put(path: string, query: string) {
    // copied from https://github.com/puppeteer/puppeteer/issues/592#issuecomment-325752748
    return this.page.evaluate(async (input, body) => {
      // eslint-disable-next-line no-undef
      const response = await fetch(input, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });
      return response.json();
    }, path, query);
  }
}
