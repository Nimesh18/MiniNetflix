import { Component, OnInit } from '@angular/core';
import { TMDBMovie } from '../common/models/tmdb-movie.model';
import { FavouriteService } from './favourite.service';

@Component({
  selector: 'favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  private _movies: TMDBMovie[];

  get movies(): TMDBMovie[] { return this._movies; };
  set movies(value: TMDBMovie[]) { this._movies = value; };

  constructor(private favouriteService: FavouriteService) { }

  ngOnInit() {
    this.populateMovies();
  }

  populateMovies() {
    this.movies = this.favouriteService.getFavourites();
  }

  favourite(id: number, movie: TMDBMovie) {
    this.populateMovies();
  }
}
