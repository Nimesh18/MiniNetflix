import { Injectable } from '@angular/core';
import { TMDBMovie } from '../common/models/tmdb-movie.model';

@Injectable()
export class FavouriteService {

  constructor() { }

  favourite(id: number, movie: TMDBMovie) {
    if (id >= 0) {
      const key = id.toString();
      const result = localStorage.getItem(key);
      if (result == null)
        localStorage.setItem(key, JSON.stringify(movie));
      else
        localStorage.removeItem(key);
    }
  }

  isFavourite(id: number) {  
    let found = false;
    for (let i=0; i < localStorage.length; i++) {
      if (+localStorage.key(i) === id) {
        found = true;
        break;
      }
    }
    return found;
  }

  getFavourites(): Array<any> {
    const favourites = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const movie = localStorage.getItem(key);
      if (movie != null)
        favourites.push(JSON.parse(movie));
    }
    return favourites;
  }
}
