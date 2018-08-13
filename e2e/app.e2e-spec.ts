import { CoreUIPage } from './app.po';

describe('core-ui App', function() {
  let page: CoreUIPage;

  beforeEach(() => {
    page = new CoreUIPage();
  });

  it('should display footer containing creativeLabs', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('creativeLabs');
  });
});
