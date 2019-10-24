export interface TMDBMovie {
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    id: number;
    adult: boolean;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: Date;
}

export interface TMDBMovieDetail extends TMDBMovie {
    imdb_id?: string;
}

export interface OMDBMovie {
    Director: string;
    Actors: string;
}

export interface TMDBSearchResult {
    page: number;
    total_results: number;
    total_pages: number;
    results: TMDBMovie[];
    type?: CallType;
    query?: string;
}

export enum CallType {
  Search, Discover
}