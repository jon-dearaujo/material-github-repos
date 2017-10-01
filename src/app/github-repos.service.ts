import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

@Injectable()
export class GithubReposService {
  constructor(private http: Http) { }

  private readonly GITHUB_API_BASE_URL="https://api.github.com";
  private readonly GITHUB_API_REPO_API = "/search/repositories";
  private readonly GITHUB_API_QUERY_PARAMETER = "q";
  private readonly GITHUB_API_PAGE_PARAMETER = "page";
  private readonly GITHUB_API_SORT_PARAMETER = "sort";
  private readonly GITHUB_API_DIRECTION_PARAMETER = "order";

  public search(searchValue: string, pageNumber: number=1, sortAttribute: string="", sortDirection: string=""): Observable<any> {
    const searchUrl: string = this.buildSearchUrl(
      searchValue, pageNumber, sortAttribute, sortDirection
    );

    return this.http.get(searchUrl).map(response => response.json());

  }

  private buildSearchUrl(searchValue: string, pageNumber: number, sortAttribute: string, sortDirection: string): string {
    return `${this.GITHUB_API_BASE_URL}${this.GITHUB_API_REPO_API}?${this.GITHUB_API_QUERY_PARAMETER}=${searchValue}&${this.GITHUB_API_PAGE_PARAMETER}=${pageNumber}&${this.GITHUB_API_SORT_PARAMETER}=${sortAttribute}&${this.GITHUB_API_DIRECTION_PARAMETER}=${sortDirection}`
  }
}