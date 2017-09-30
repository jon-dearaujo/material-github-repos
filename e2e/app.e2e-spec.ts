import { MaterialGithubReposPage } from './app.po';

describe('material-github-repos App', () => {
  let page: MaterialGithubReposPage;

  beforeEach(() => {
    page = new MaterialGithubReposPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
