import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movies/movie.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SubscriberBase } from '../common/models/base/subscriber-base';
import { CallType } from '../common/models/tmdb-movie.model';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent extends SubscriberBase implements OnInit {

  subscription: Subscription;
  searchControl = new FormControl();
  constructor(private movieService: MovieService) { super(); }

  ngOnInit() {
    this.subscriptions.push(this.searchControl.valueChanges.pipe(debounceTime(600), distinctUntilChanged()).subscribe((value: string) => {
      if (value != null && value.length > 0)
        this.searchMovie(value);
      else
        this.defaultView();
    }));
  }

  searchMovie(value: string = this.searchControl.value || "") {
    this.movieService.searchMovie(value).subscribe(result => {
      this.movieService.SearchResult = result;
      this.movieService.SearchResult.type = CallType.Search;
      this.movieService.SearchResult.query = value;
      this.movieService.Movies = [result["results"]];
    });
  }

  defaultView() {
    this.movieService.getMovies().subscribe(result => {
      this.movieService.SearchResult = result;
      this.movieService.SearchResult.type = CallType.Discover;
      this.movieService.Movies = [result["results"]];
    });
  }

  clearSearch() {
    this.searchControl.setValue(null);
  }

}
