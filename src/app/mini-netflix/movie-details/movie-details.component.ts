import { Component, OnInit } from '@angular/core';
import { TMDBMovie, TMDBMovieDetail, OMDBMovie } from '../common/models/tmdb-movie.model';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movies/movie.service';

@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: TMDBMovieDetail
  extendedDetails: OMDBMovie;
  id: number
  image_base_url = "https://image.tmdb.org/t/p/w500";

  constructor(private movieService:MovieService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params["id"];
    this.movieService.getMovie(this.id).subscribe(result => {
      this.movie = result;
      const imdb_id = result["imdb_id"];
      if (imdb_id) {
        this.movieService.getOMDBMovie(imdb_id).subscribe(res => {
          this.extendedDetails = res;
        });
      }
    })
  }

}
