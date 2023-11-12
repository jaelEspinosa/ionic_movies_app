import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle, PeliculasPorGenero } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import { MoviesService } from './movies.service';
import { TvDetalle } from '../interfaces/tv.interfaces';
import { TvService } from './tv.service';



@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController,
    private moviesSvc: MoviesService,
    private tvSvc: TvService
  ) {
    this.init();
  }

 private _favoritosPorGenero: PeliculasPorGenero[]= []
 private _peliculas: PeliculaDetalle[] = []
 private _tvSeries: TvDetalle[] = []


get favoritosPorGenero (): PeliculasPorGenero[] {

  return [...this._favoritosPorGenero]

}

get peliculas ():PeliculaDetalle [] {
  return [...this._peliculas]
}

get tvSeries ():TvDetalle[]{
  return [...this._tvSeries]
}


  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      duration: 2000
    })
    toast.present()
  }


  async init(){
    const storage = await this.storage.create();
    await this.cargarPeliculasFavoritos();
    await this.cargarTvSeriesFavoritos();
    await this.tvSvc.loadGenre();
    await this.moviesSvc.loadGenre()


 }

  async guardarPelicula( pelicula: PeliculaDetalle) {

    let exists = false;
    let mensaje = ''
    for(const peli of this._peliculas){
      if (peli.id === pelicula.id){
        exists = true;
        break;
      }
    }

    if (exists){
      this._peliculas = this._peliculas.filter(peli=> peli.id !== pelicula.id)
      mensaje = 'Removido de favoritos'
    }else{
      this._peliculas.unshift( pelicula )
      mensaje = 'Agregado a favoritos'
    }

    await this.storage.set('peliculas', this._peliculas)
    this.presentToast(mensaje)
    return !exists
  }

  async guardarTvSerie( tvSerie: TvDetalle ) {

    let exists = false;
    let mensaje = ''
    for(const serie of this._tvSeries){
      if (serie.id === tvSerie.id){
        exists = true;
        break;
      }
    }

    if (exists){
      this._tvSeries = this._tvSeries.filter(serie=> serie.id !== tvSerie.id)
      mensaje = 'Removido de favoritos'
    }else{
      this._tvSeries.unshift( tvSerie )
      mensaje = 'Agregado a favoritos'
    }

    await this.storage.set('TvSeries', this._tvSeries)
    this.presentToast(mensaje)
    return !exists
  }

 async cargarPeliculasFavoritos(){
    const peliculasFavoritos = await this.storage.get('peliculas');
    this._peliculas = peliculasFavoritos || [];

    return this._peliculas
 }

 async cargarTvSeriesFavoritos(){
  const tvSeriesFavoritas = await this.storage.get('TvSeries');
  this._tvSeries = tvSeriesFavoritas || [];

  return this._tvSeries
}

async existePelicula( id:number ){
  const existe = this._peliculas.find(peli => peli.id === id)
  return (existe) ? true : false;
}

async existeTvSerie( id:number ){
  const existe = this._tvSeries.find(serie => serie.id === id)
  return (existe) ? true : false;
}

}
