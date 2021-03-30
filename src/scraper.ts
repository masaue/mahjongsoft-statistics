import puppeteer from 'puppeteer';

export default class Scraper {
  private readonly TARGET = 'https://mahjongsoft.com/sessions.php';
  private readonly SCRIPT = 'https://mahjongsoft.com/_sessions.php';
  private readonly LOGIN = '_login.php';
  private page!: puppeteer.Page;

  async initialize(): Promise<void> {
    const browser = await puppeteer.launch({ headless: false });
    const pages = await browser.pages();
    [this.page] = pages;
    await this.gotoTarget();
  }

  async statistics(login: string, password: string): Promise<void> {
    await this.login(login, password);
  }

  private async gotoTarget() {
    await Promise.all([
      this.page.waitForResponse(this.SCRIPT),
      this.page.goto(this.TARGET),
    ]);
  }

  private async login(login: string, password: string) {
    const query = `login=${login}&password=${password}&rememberme=0`;
    console.log(await this.put(this.LOGIN, query));
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
