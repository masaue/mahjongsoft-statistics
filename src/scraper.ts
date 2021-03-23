import puppeteer from 'puppeteer';

export default class Scraper {
  private readonly TARGET = 'https://mahjongsoft.com/sessions.php#';
  private page!: puppeteer.Page;

  constructor () {}

  async initialize() {
    const browser = await puppeteer.launch({headless: false});
    const pages = await browser.pages();
    this.page = pages[0];
    await this.page.goto(this.TARGET);
  }
}
