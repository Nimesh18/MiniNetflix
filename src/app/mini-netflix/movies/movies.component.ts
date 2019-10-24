import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { TMDBMovie, TMDBSearchResult, CallType } from '../common/models/tmdb-movie.model';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  get movies(): Array<TMDBMovie[]> { return this.movieService.Movies; };
  get totalPages() {
    if (this.movieService.SearchResult) 
      return this.movieService.SearchResult.total_pages;
  };
  get currentPage() {
    if (this.movieService.SearchResult) 
      return this.movieService.SearchResult.page;
  };
  current: number;
  showLoadingImage: boolean = false;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    if (this.movieService.Movies == null || this.movieService.Movies.length === 0) {
      this.movieService.getMovies().subscribe(result => {
        this.movieService.Movies = [result["results"]];
        this.movieService.SearchResult = result;
        this.movieService.SearchResult.type = CallType.Discover;
      });
    }
  }

  loadMore(result) {
    this.current = this.currentPage;
    if (result > 90 && ++this.current <= this.totalPages) {
      this.showLoadingImage = true;
      if (this.movieService.SearchResult.type === CallType.Search) {
        this.movieService.searchMovie(this.movieService.SearchResult.query, this.current).subscribe(result => this.callback(result));
      }
      else {
        this.movieService.getMovies(this.current).subscribe(result => this.callback(result));
      }      
    }
  }

  private callback(result) {
    if (this.movieService.Movies == null) this.movieService.Movies = [];
    this.setSearchResult(result);
    this.movieService.Movies.push(result["results"]);
    this.movieService.Movies = [].concat(this.movieService.Movies);
    this.showLoadingImage = false;
  }

  private setSearchResult(searchResult: TMDBSearchResult) {
    const { query, type } = this.movieService.SearchResult;
    this.movieService.SearchResult = searchResult;
    [this.movieService.SearchResult.query, this.movieService.SearchResult.type] = [ query, type ];
  }
}
