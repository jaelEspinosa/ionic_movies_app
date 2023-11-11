import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Genre, PeliculaDetalle, PeliculasPorGenero } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import { MoviesService } from './movies.service';



@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private storage = inject ( Storage )
  private toastCtrl = inject ( ToastController )
  private moviesSvc = inject ( MoviesService )

 private _favoritosPorGenero: PeliculasPorGenero[]= []

 public  peliculas: PeliculaDetalle[] = []


get favoritosPorGenero (): PeliculasPorGenero[] {

  return [...this._favoritosPorGenero]

}



  constructor() {
    this.init();
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
    const generos = await this.moviesSvc.loadGenre()
    this.createFavoritosPorGenero(this.peliculas , generos)

 }

  async guardarPelicula( pelicula: PeliculaDetalle) {

    let exists = false;
    let mensaje = ''
    for(const peli of this.peliculas){
      if (peli.id === pelicula.id){
        exists = true;
        break;
      }
    }

    if (exists){
      this.peliculas = this.peliculas.filter(peli=> peli.id !== pelicula.id)
      mensaje = 'Removido de favoritos'
    }else{
      this.peliculas.unshift( pelicula )
      mensaje = 'Agregado a favoritos'
    }

    await this.storage.set('peliculas', this.peliculas)
    this.presentToast(mensaje)

    return !exists
  }

 async cargarPeliculasFavoritos(){
    const peliculasFavoritos = await this.storage.get('peliculas');
    this.peliculas = peliculasFavoritos || [];

    return this.peliculas
 }

async existePelicula( id:number ){


  const existe = this.peliculas.find(peli => peli.id === id)


  return (existe) ? true : false;
}

createFavoritosPorGenero (peliculas: PeliculaDetalle[], generos: Genre[]) {
 console.log('creando favoritos por genero de ', peliculas,' y generos ', generos)
 generos.forEach(genero =>{
  this._favoritosPorGenero.push({
    genero,
    peliculas: peliculas.filter(peli => {
       return peli.genres.find( genre => genre.id === genero.id)
    })
  })
 })
console.log('Los favoritos por genero son...', this._favoritosPorGenero)
}


}
