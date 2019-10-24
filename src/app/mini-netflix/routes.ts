import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavouritesComponent } from './favourites/favourites.component';

export const routes: Routes = [
    { path: 'movies', component: MoviesComponent },
    { path: 'movies/:id', component: MovieDetailsComponent },
    { path: 'favourites', component: FavouritesComponent },
    { path: '', redirectTo: '/movies', pathMatch: 'full' }
]