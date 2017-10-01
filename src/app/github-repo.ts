export class GithubRepo {
  private _raw: any;
  constructor(raw: any) {
    this._raw = raw;
  }

  get name() {
    return this._raw.name;
  }

  get url() {
    return this._raw.html_url;
  }

  get stars() {
    return this._raw.stargazers_count;
  }

  get forks() {
    return this._raw.forks;
  }
}