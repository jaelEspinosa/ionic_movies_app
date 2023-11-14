import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActoresDetalle } from '../interfaces/actors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  public url = environment.baseUrl
  public apiKey = environment.apiKey

  private http = inject ( HttpClient )

  constructor() { }



  getActorDetalle (id: number): Observable<ActoresDetalle>{

    return this.http.get<ActoresDetalle>(`${this.url}/person/${ id }?api_key=${this.apiKey}&language=es`)
  }

}
