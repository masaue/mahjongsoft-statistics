import puppeteer from 'puppeteer';

export default class Scraper {
  private readonly TARGET = 'https://mahjongsoft.com/sessions.php';
  private readonly SCRIPT = 'https://mahjongsoft.com/_sessions.php';
  private readonly LOGIN = 'https://mahjongsoft.com/_login.php';
  private page!: puppeteer.Page;

  async initialize(): Promise<void> {
    const browser = await puppeteer.launch({ headless: false });
    const pages = await browser.pages();
    [this.page] = pages;
    await this.gotoTarget();
  }

  async statistics(login: string, password: string): Promise<void> {
    await this.login(login, password);
    await this.showMySessions();
  }

  private async clickLoginButton() {
    await Promise.all([
      this.page.waitForResponse(this.LOGIN),
      this.page.click('#login_button'),
    ]);
    // for hiding login modal
    await Promise.all([
      // this.page.waitForFunction('document.getElementById("navbar_text").value !== "Offline"'),
      // this.page.waitForSelector('#loginModal', {visible: false}),
      // this.page.waitForSelector('#logout_button', {visible: true}),
      // TODO use another waitforXXXX()
      this.page.waitForTimeout(1000),
      this.page.click('#sessionsShowButton'),
    ]);
  }

  private async fillLoginAndPassword(login: string, password: string) {
    await this.page.type('#loginLoginInput', login);
    await this.page.type('#loginPasswordInput', password);
  }

  private async gotoTarget() {
    await Promise.all([
      this.page.waitForResponse(this.SCRIPT),
      this.page.goto(this.TARGET),
    ]);
  }

  private async login(login: string, password: string) {
    await this.showLoginModal();
    await this.fillLoginAndPassword(login, password);
    await this.clickLoginButton();
  }

  private async showMySessions() {
    await this.page.click('#sessionsLastWeekCheck');
    await this.page.click('#sessionsWithMeCheck');
    await Promise.all([
      this.page.waitForResponse(this.SCRIPT),
      this.page.click('#sessionsShowButton'),
    ]);
  }

  private async showLoginModal() {
    await Promise.all([
      this.page.waitForSelector('#loginModal', { visible: true }),
      this.page.click('#login_form_button'),
    ]);
  }
}
