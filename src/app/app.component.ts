import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx';
import { GithubReposService } from './github-repos.service';
import { GithubRepo } from './github-repo';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns = ['name', 'url', 'stars', 'forks'];
  reposDataSource: ReposDataSource = null;
  reposData: BehaviorSubject<GithubRepo[]>;
  searchFormControl: FormControl;
  searchSubscription: Subscription;
  
  constructor(private githubReposService: GithubReposService) {
    this.reposData = new BehaviorSubject(null);
    this.reposDataSource = new ReposDataSource(this.reposData);
    this.searchFormControl = new FormControl();
    this.searchFormControl
      .valueChanges
      .filter(value => value && value != '')
      .debounceTime(500).subscribe(x => {
      this.searchSubscription = this.githubReposService
        .search(x)
        .map(data => this.parse(data))
        .subscribe(repos => this.reposData.next(repos));
    })

    this.searchFormControl
      .valueChanges
      .filter(value => value == null || value == '')
      .debounceTime(1000)
      .subscribe(() => {
        this.reposData.next(null)
        if (!this.searchSubscription.closed) {
          this.searchSubscription.unsubscribe();
        }
      });
  }
  
  public get reposLoaded(): boolean {
    return !!this.reposData.getValue();
  }

  public get isEmptyResult(): boolean {
    return this.reposLoaded && this.reposData.getValue().length == 0;
  }

  private parse(data: any) {
    return data.items.map(repo => new GithubRepo(repo));
  }
}

export class ReposDataSource extends DataSource<GithubRepo> {
  constructor(private repos: BehaviorSubject<GithubRepo[]>) {
    super();
  }
  connect(): Observable<GithubRepo[]> {
    return this.repos;
  }

  disconnect() { }
}

