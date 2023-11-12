import { Pipe, PipeTransform } from '@angular/core';
import { PeliculaDetalle, PeliculasPorGenero } from '../interfaces/interfaces';

import { MoviesService } from '../services/movies.service';

@Pipe({
  name: 'ordenarPorGenero'
})
export class OrdenarPorGeneroPipe implements PipeTransform {

  constructor(
    private movieSvc: MoviesService
  ){}

  transform(favoritos: PeliculaDetalle[]): PeliculasPorGenero[]{

    if(!favoritos){
      return [];
    }
    const generos = this.movieSvc.genres
    let favoritosPorGenero: PeliculasPorGenero[] = []

    generos.forEach(genero =>{
     favoritosPorGenero.push({
       genero,
       peliculas: favoritos.filter(peli => {
          return peli.genres.find( genre => genre.id === genero.id)
       })
     })
    })

   return favoritosPorGenero || [] ;
   }
  }


