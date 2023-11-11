import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent  implements OnInit {

  @Input() peliculas: Pelicula[] | PeliculaDetalle[] = []

  modalCtrl = inject ( ModalController )
  constructor() { }

  ngOnInit() {}


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
