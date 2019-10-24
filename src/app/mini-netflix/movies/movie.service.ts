import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TMDBMovie, TMDBSearchResult, TMDBMovieDetail, OMDBMovie } from '../common/models/tmdb-movie.model';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, debounceTime } from 'rxjs/operators';


@Injectable()
export class MovieService {

  private readonly TMDB_API_KEY = "place_api_key_here";
  // scheme (https://) & domain (subdomain (api) themoviedb (second level domain) org (top level domain)) & subdirectory (/3)
  private readonly TMDB_DOMAIN = "https://api.themoviedb.org/3"; 
  private readonly TMDB_URL = `${this.TMDB_DOMAIN}/discover/movie`;

  private readonly OMDB_API_KEY = "place_api_key_here";
  private readonly OMDB_DOMAIN = "http://www.omdbapi.com/";
  private movies: TMDBMovie[][];
  private searchResult: TMDBSearchResult;

  get Movies(): Array<TMDBMovie[]> {
    return this.movies;
  }

  set Movies(value: Array<TMDBMovie[]>) {
    this.movies = value;
  }

  get SearchResult(): TMDBSearchResult {
    return this.searchResult;
  }

  set SearchResult(value: TMDBSearchResult) {
    this.searchResult = value;
  }

  constructor(private http: HttpClient) { }

  getMovies(page: number = 1): Observable<TMDBSearchResult> {
    let params = new HttpParams()
    .set("sort_by", "popularity.desc")
    .set("api_key", this.TMDB_API_KEY)
    .set("page", page.toString());
    return this.http.get<TMDBSearchResult>(this.TMDB_URL, { params }).pipe(catchError(this.handleError('getMovies')));
  }

  getMovie(id: number): Observable<TMDBMovieDetail> {
    let params = new HttpParams()
    .set("api_key", this.TMDB_API_KEY);
    return this.http.get<TMDBMovieDetail>(`${this.TMDB_DOMAIN}/movie/${id}?`, { params }).pipe(catchError(this.handleError("getMovie")));
  }

  getOMDBMovie(imdb_id: string): Observable<OMDBMovie> {
    let params = new HttpParams()
    .set("apikey", this.OMDB_API_KEY)
    .set("i", imdb_id);
    return this.http.get<OMDBMovie>(`${this.OMDB_DOMAIN}`, { params }).pipe(catchError(this.handleError("getOMDBMovie")));
  }

  searchMovie(query: string, page: number = 1, include_adult = false): Observable<TMDBSearchResult> {
    const params = new HttpParams()
    .set("api_key", this.TMDB_API_KEY)
    .set("query", query)
    .set("page", page.toString())
    .set("include_adult", ''+include_adult);

    return this.http.get<TMDBSearchResult>(`${this.TMDB_DOMAIN}/search/movie?`, { params }).pipe(catchError(this.handleError("searchMovie")));
  }

  searchMovieAppendResults(query: string, page: number = 1, include_adult = false): void {
    this.searchMovie(query, page, include_adult).subscribe(result => {
      this.SearchResult = result;
      this.Movies.push(result["results"]);
    });
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: T): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    }
  }
}
