import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle, PeliculasPorGenero } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import { MoviesService } from './movies.service';



@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController,
    private moviesSvc: MoviesService
  ) {
    this.init();
  }

 private _favoritosPorGenero: PeliculasPorGenero[]= []

 private _peliculas: PeliculaDetalle[] = []


get favoritosPorGenero (): PeliculasPorGenero[] {

  return [...this._favoritosPorGenero]

}

get peliculas ():PeliculaDetalle [] {
  return [...this._peliculas]
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

 async cargarPeliculasFavoritos(){
    const peliculasFavoritos = await this.storage.get('peliculas');
    this._peliculas = peliculasFavoritos || [];

    return this._peliculas
 }

async existePelicula( id:number ){
  const existe = this._peliculas.find(peli => peli.id === id)
  return (existe) ? true : false;
}

}
