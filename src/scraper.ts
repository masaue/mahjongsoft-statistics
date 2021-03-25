import puppeteer from 'puppeteer';

export default class Scraper {
  private readonly TARGET = 'https://mahjongsoft.com/sessions.php';
  private readonly SCRIPT = 'https://mahjongsoft.com/_sessions.php';
  private page!: puppeteer.Page;

  constructor () {}

  async initialize() {
    const browser = await puppeteer.launch({headless: false});
    const pages = await browser.pages();
    this.page = pages[0];
    await this.gotoTarget();
  }

  async statistics() {
    await this.showAllSessions();
  }

  private async gotoTarget() {
    await Promise.all([
      this.page.waitForResponse(this.SCRIPT),
      this.page.goto(this.TARGET),
    ]);
  }

  private async showAllSessions() {
    await this.page.click('#sessionsLastWeekCheck');
    await Promise.all([
      this.page.waitForResponse(this.SCRIPT),
      this.page.click('#sessionsShowButton'),
    ]);
  }
}
