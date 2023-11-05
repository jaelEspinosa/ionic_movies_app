import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TvSeries } from 'src/app/interfaces/tv.interfaces';

import { TvDetalleComponent } from '../tv-detalle/tv-detalle.component';

@Component({
  selector: 'tv-show-bakdrop',
  templateUrl: './slide-tv-show-bakdrop.component.html',
  styleUrls: ['./slide-tv-show-bakdrop.component.scss'],
})
export class SlideTvShowBakdropComponent  implements OnInit {

  modalCtrl = inject ( ModalController )

  @Input() tvSeries: TvSeries[] =[]
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
