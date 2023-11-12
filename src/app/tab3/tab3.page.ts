import { PeliculasPorGenero } from './../interfaces/interfaces';
import { Component, inject } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';
import { Genre } from '../interfaces/tv.interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';


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

  async verDetalle(id: number) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    })
    modal.present();
  }




}






