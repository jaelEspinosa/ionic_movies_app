import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TvSeries } from 'src/app/interfaces/tv.interfaces';

import { TvDetalleComponent } from '../tv-detalle/tv-detalle.component';

@Component({
  selector: 'tv-show-poster',
  templateUrl: './slide-tv-show-poster.component.html',
  styleUrls: ['./slide-tv-show-poster.component.scss'],
})
export class SlideTvShowPosterComponent  implements OnInit {

  @Input() tvSeries: TvSeries[] = []

  modalCtrl = inject ( ModalController )
  constructor() { }

  ngOnInit() {}


  async verDetalle(id: number) {

    const modal = await this.modalCtrl.create({
      component: TvDetalleComponent,
      componentProps:{
        id
      }
    })
    modal.present();
  }

}
