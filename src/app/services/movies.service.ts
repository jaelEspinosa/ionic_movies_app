import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PeliculaDetalle, RespuestaCredits, RespuestaMDB } from '../interfaces/interfaces';
import { Observable } from 'rxjs';



const baseUrl = environment.baseUrl;
const apikey  = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor() { }

  private http = inject ( HttpClient );
  private _currentPage = 0;
  private _totalPages = 0;




  private ejecutarQuery<T>( query: string){
      query = baseUrl + query;
      query += `&api_key=${ apikey }&language=es&include_image_language=es`
      return this.http.get<T>( query )
  }


  getPopulars():Observable<RespuestaMDB> {
    this._currentPage++;

      const query= `/discover/movie?sort_by=popularity.desc&page=${this._currentPage}`

      return this.ejecutarQuery<RespuestaMDB>(query)

  }

  getFeacture():Observable<RespuestaMDB> {

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

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ init }&primary_release_date.lte=${ final }`);
  }

  getPeliculaDetalle( id: number):Observable<PeliculaDetalle> {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`)
  }

  getActoresPelicula( id: number):Observable<RespuestaCredits> {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`)
  }


}


