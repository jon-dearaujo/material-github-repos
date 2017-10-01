import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { GithubReposService } from './github-repos.service';
import { AppComponent } from './app.component';
import { MdInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpModule,
    MdInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GithubReposService],
  bootstrap: [AppComponent]
})
export class AppModule { }
