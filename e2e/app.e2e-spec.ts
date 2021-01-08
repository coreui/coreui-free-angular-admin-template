import { AppDashboard } from './app.po';

describe('CoreUI template', () => {
  let page: AppDashboard;
  const sleep = 300;

  page = new AppDashboard();
  const browser = page.getBrowser();
  browser.driver.manage().window().setSize(600, 800);
  browser.sleep(sleep);
  page.navigateTo();

  // beforeEach(() => {
  //   page = new AppDashboard();
  //   page.navigateTo();
  // });

  it('should display CoreUI Dashboard', async () => {
    expect(await page.getParagraphText()).toEqual('Traffic');
  });

  it('should display footer containing creativeLabs', async () => {
    expect(await page.getFooterText()).toContain('creativeLabs');
  });

  it('should toggle `sidebar-minimized` body.class on `sidebar-minimizer` click', () => {
    browser.manage().window().maximize();
    browser.sleep(1000);
    const body = page.getBody();
    expect(body.getAttribute('class')).not.toContain('sidebar-minimized');
    const button = page.getByCss('.sidebar-minimizer');
    button.click();
    browser.sleep(sleep);
    expect(body.getAttribute('class')).toContain('sidebar-minimized');
    browser.sleep(sleep);
    button.click();
    browser.sleep(sleep);
    expect(body.getAttribute('class')).not.toContain('sidebar-minimized');
  });

  it('should toggle `sidebar-show` body.class on `navbar-toggler` click', () => {
    browser.driver.manage().window().setSize(600, 800);
    browser.sleep(1000);
    const body = page.getBody();
    expect(body.getAttribute('class')).not.toContain('sidebar-show');
    const button1 = page.getByCss('.navbar-toggler.d-lg-none').first();
    browser.sleep(sleep);
    button1.click();
    browser.sleep(sleep);
    expect(body.getAttribute('class')).toContain('sidebar-show');
    const button2 = page.getByCss('.navbar-toggler').first();
    browser.sleep(sleep);
    button2.click();
    browser.sleep(sleep);
    expect(body.getAttribute('class')).not.toContain('sidebar-show');
  });

  it('should toggle `aside-menu-lg-show` body.class on `navbar-toggler` click', () => {
    browser.manage().window().maximize();
    browser.sleep(1000);
    const body = page.getBody();
    expect(body.getAttribute('class')).not.toContain('aside-menu-lg-show');
    const button1 = page.getByCss('.navbar-toggler.d-none.d-lg-block').last();
    button1.click();
    browser.sleep(sleep);
    expect(body.getAttribute('class')).toContain('aside-menu-lg-show');
    browser.sleep(sleep);
    button1.click();
    browser.sleep(sleep);
    expect(body.getAttribute('class')).not.toContain('aside-menu-lg-show');
  });
});
