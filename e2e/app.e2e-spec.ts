import { AppliPage } from './app.po';

describe('appli App', function() {
  let page: AppliPage;

  beforeEach(() => {
    page = new AppliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
