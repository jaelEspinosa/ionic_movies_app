import { Pipe, PipeTransform } from '@angular/core';
import { TvService } from '../services/tv.service';
import { TvDetalle, TvSeriesPorGenero } from '../interfaces/tv.interfaces';

@Pipe({
  name: 'ordenarTvPorGenero'
})
export class OrdenarTvPorGeneroPipe implements PipeTransform {

  constructor(
    private tvSvc: TvService
  ){}

  transform(favoritos: TvDetalle[]): TvSeriesPorGenero[]{

    if(!favoritos){
      return [];
    }
    const generos = this.tvSvc.genres
    let favoritosPorGenero: TvSeriesPorGenero[] = []

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


