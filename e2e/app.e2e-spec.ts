import { AutRealEstateTemplatePage } from './app.po';

describe('AutRealEstate App', function() {
  let page: AutRealEstateTemplatePage;

  beforeEach(() => {
    page = new AutRealEstateTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
