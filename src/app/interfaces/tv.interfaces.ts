// Generated by https://quicktype.io

export interface TvSeriesResponse {
  page:          number;
  results:       TvSeries[];
  total_pages:   number;
  total_results: number;
}

export interface  TvSeries {
  backdrop_path:     string;
  first_air_date:    string;
  genre_ids:         number[];
  id:                number;
  name:              string;
  origin_country:    string[];
  original_language: string;
  original_name:     string;
  overview:          string;
  popularity:        number;
  poster_path:       string;
  vote_average:      number;
  vote_count:        number;
}


// Generated by https://quicktype.io

export interface TvDetalle {
  adult:                boolean;
  backdrop_path:        string;
  created_by:           CreatedBy[];
  episode_run_time:     number[];
  first_air_date:       string;
  genres:               Genre[];
  homepage:             string;
  id:                   number;
  in_production:        boolean;
  languages:            string[];
  last_air_date:        string;
  last_episode_to_air:  TEpisodeToAir;
  name:                 string;
  next_episode_to_air:  TEpisodeToAir;
  networks:             Network[];
  number_of_episodes:   number;
  number_of_seasons:    number;
  origin_country:       string[];
  original_language:    string;
  original_name:        string;
  overview:             string;
  popularity:           number;
  poster_path:          string;
  production_companies: Network[];
  production_countries: ProductionCountry[];
  seasons:              Season[];
  spoken_languages:     SpokenLanguage[];
  status:               string;
  tagline:              string;
  type:                 string;
  vote_average:         number;
  vote_count:           number;
}

export interface CreatedBy {
  id:           number;
  credit_id:    string;
  name:         string;
  gender:       number;
  profile_path: string;
}

export interface Genre {
  id:   number;
  name: string;
}

export interface TEpisodeToAir {
  id:              number;
  name:            string;
  overview:        string;
  vote_average:    number;
  vote_count:      number;
  air_date:        string;
  episode_number:  number;
  episode_type:    string;
  production_code: string;
  runtime:         number | null;
  season_number:   number;
  show_id:         number;
  still_path:      null | string;
}

export interface Network {
  id:             number;
  logo_path:      null | string;
  name:           string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name:       string;
}

export interface Season {
  air_date:      string;
  episode_count: number;
  id:            number;
  name:          string;
  overview:      string;
  poster_path:   string;
  season_number: number;
  vote_average:  number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1:    string;
  name:         string;
}


// Generated by https://quicktype.io

export interface TvCast {
  cast: Cast[];
  crew: Cast[];
  id:   number;
}

export interface Cast {
  adult:                boolean;
  gender:               number;
  id:                   number;
  known_for_department: Department;
  name:                 string;
  original_name:        string;
  popularity:           number;
  profile_path:         null | string;
  character?:           string;
  credit_id:            string;
  order?:               number;
  department?:          Department;
  job?:                 string;
}

export enum Department {
  Acting = "Acting",
  Art = "Art",
  CostumeMakeUp = "Costume & Make-Up",
  Directing = "Directing",
  Production = "Production",
  Sound = "Sound",
  VisualEffects = "Visual Effects",
  Writing = "Writing",
}
