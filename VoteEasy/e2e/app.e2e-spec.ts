import { VoteEasyPage } from './app.po';

describe('vote-easy App', () => {
  let page: VoteEasyPage;

  beforeEach(() => {
    page = new VoteEasyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
