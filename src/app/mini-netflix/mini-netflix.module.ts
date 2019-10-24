import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniNetflixComponent } from './mini-netflix.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieService } from './movies/movie.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { FavouritesComponent } from './favourites/favourites.component';
import { FavouriteService } from './favourites/favourite.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElementScrollPercentageService } from './element-scroll/element-scroll-percentage.service';
import { ElementScrollPercentageDirective } from './element-scroll/element-scroll-percentage.directive';
import { MovieComponent } from './movie/movie.component';
import { MoviePageComponent } from './movie-page/movie-page.component';



@NgModule({
  declarations: [
    MiniNetflixComponent,
    MoviesComponent,
    NavBarComponent,
    MovieDetailsComponent,
    FavouritesComponent,
    ElementScrollPercentageDirective,
    MovieComponent,
    MoviePageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    MiniNetflixComponent
  ],
  providers: [
    MovieService,
    FavouriteService,
    ElementScrollPercentageService
  ]
})
export class MiniNetflixModule { }
