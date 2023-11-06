import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TvDetalle, TvSeriesResponse, TvCast, Result } from '../interfaces/tv.interfaces';



const baseUrl = environment.baseUrl;
const apikey  = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor() { }

  private http = inject ( HttpClient );
  private _currentPage = 0;
  private _currentSearchPage = 0;

  isLoading = false;

  get currentSearchPage() {
    return this._currentSearchPage
  }


  private ejecutarQuery<T>( query: string){
      query = baseUrl + query;
      query += `&api_key=${ apikey }&language=es&include_image_language=es`
      /* console.log('la query es: ',query) */
      return this.http.get<T>( query )

  }


  getPopulars():Observable<TvSeriesResponse> {
      this._currentPage++;
      const query= `/discover/tv?sort_by=popularity.desc&page=${this._currentPage}`
      return this.ejecutarQuery<TvSeriesResponse>(query)

  }

  getFeacture():Observable<TvSeriesResponse> {

    const today = new Date();
    const lastDay = new Date( today.getFullYear(), today.getMonth() + 1,  0).getDate();
    const month = today.getMonth() + 1;

    let monthString;

    if (month < 10){
      monthString = '0' + month;
    } else {
      monthString = month;
    }

    const init = `${ today.getFullYear() }-${ monthString }-01`
    const final = `${ today.getFullYear() }-${ monthString }-${lastDay}`

    return this.ejecutarQuery<TvSeriesResponse>(`/discover/tv?primary_release_date.gte=${ init }&primary_release_date.lte=${ final }`);
  }

  getPeliculaDetalle( id: number):Observable<TvDetalle> {
    return this.ejecutarQuery<TvDetalle>(`/tv/${id}?a=1`);
  }

  getActoresPelicula( id: number):Observable<TvCast> {
    return this.ejecutarQuery<TvCast>(`/tv/${id}/credits?a=1`);
  }

  buscarPeliculas( terminoBusqueda: string):Observable<Result> {

    this._currentSearchPage ++;
    return this.ejecutarQuery<Result>(`/search/tv?query=${terminoBusqueda}&page=${this._currentSearchPage}`);

  }

  resetSearchPage(){
    this._currentSearchPage = 0;
  }



}


