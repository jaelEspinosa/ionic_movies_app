import { PeliculasPorGenero } from './../interfaces/interfaces';
import { Component, inject } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';
import { Genre, TvDetalle } from '../interfaces/tv.interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';
import { TvDetalleComponent } from '../components/tv-detalle/tv-detalle.component';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

  peliculasFavoritas: PeliculaDetalle[] = [];
  dataSvc = inject ( DataLocalService );
  movieSvc = inject ( MoviesService );
  modalCtrl = inject ( ModalController )

  genres: Genre[] = [];

  get favoritosPorGenero() : PeliculasPorGenero []{
    return this.dataSvc.favoritosPorGenero
  }

  get peliculas(): PeliculaDetalle[]{
    return this.dataSvc.peliculas
  }

  get tvSeries(): TvDetalle[] {
    return this.dataSvc.tvSeries
  }

  async verDetalle(id: number, type:string = 'movie') {
    if (type === 'movie'){
      const modal = await this.modalCtrl.create({
        component: DetalleComponent,
        componentProps:{
          id
        }
      })
      modal.present();
    }else{
      const modal = await this.modalCtrl.create({
        component: TvDetalleComponent,
        componentProps:{
          id
        }
      })
      modal.present();
    }
  }




}






