export interface MediaResp {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}

export interface Media {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GenresResp {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MultiSearchResp {
  page: number;
  results: MultiResult[];
  total_pages: number;
  total_results: number;
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface VideoResp {
  id: number;
  results: Video[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CreditsResp {
  id: number;
  cast: Cast[];
}

export interface ReleaseDateInfo {
  certification: string;
  descriptors: any[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

export interface CountryReleaseDates {
  iso_3166_1: string;
  release_dates: ReleaseDateInfo[];
}

export interface ReleaseDatesResp {
  id: number;
  results: CountryReleaseDates[];
}

export interface TvContentRating {
  iso_3166_1: string;
  rating: string;
  descriptors: any[];
}

export interface TvContentRatingResp {
  id?: number;
  results: TvContentRating[];
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetails extends Media {
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  original_title: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

export interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

export interface TvDetails extends Media {
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: LastEpisodeToAir | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
}

export interface MediaImage {
  aspect_ratio: number;
  height: number;
  iso_639_1?: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MediaImagesList {
  backdrops: MediaImage[];
}

export interface ReviewInfo {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating?: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface ReviewResp {
  id: number;
  page: number;
  results: ReviewInfo[];
}

export interface AccountStates {
  id: number;
  favorite: boolean;
  watchlist: boolean;
  rated: false | { value: number };
}

export interface RatedMedia extends Media {
  rating: number;
}

export interface RatedMediaResp extends RatedMedia {
  page: number;
  results: RatedMedia[];
  total_pages: number;
  total_results: number;
}

export interface Person {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday?: string;
  gender: number;
  homepage?: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface MovieResult extends Media {
  media_type: 'movie';
}

export interface TvResult extends Media {
  media_type: 'tv';
}

export interface PersonResult extends Person {
  media_type: 'person';
}

export type MultiResult = MovieResult | TvResult | PersonResult;
