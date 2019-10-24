import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TMDBMovie } from '../common/models/tmdb-movie.model';
import { FavouriteService } from '../favourites/favourite.service';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() movie: TMDBMovie;
  @Output() favouriteBtnClick: EventEmitter<number> = new EventEmitter<number>();
  image_base_url = "https://image.tmdb.org/t/p/w500";

  constructor(private favouriteService: FavouriteService) { }

  ngOnInit() {
  }

  favourite(id: number, movie: TMDBMovie) {
    this.favouriteService.favourite(id, movie);
    this.favouriteBtnClick.emit(id);
  }

  isFavourite(id: number) {  
    return {'yellow': this.favouriteService.isFavourite(id)};
  }
}
