import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TvSeries } from 'src/app/interfaces/tv.interfaces';
import { TvService } from 'src/app/services/tv.service';
import { environment } from 'src/environments/environment';
import { TvDetalleComponent } from '../tv-detalle/tv-detalle.component';

@Component({
  selector: 'tv-show-pares',
  templateUrl: './slide-tv-show-pares.component.html',
  styleUrls: ['./slide-tv-show-pares.component.scss'],
})
export class SlideTvShowParesComponent  implements OnInit {


  tvSvc = inject( TvService )
  modalCtrl = inject ( ModalController )
  urlImg = environment.imgUrl

  @Input() tvRecientes: TvSeries[] = [];
  @Input() isLoading: boolean = false;
  @Input() error: boolean = false;

  @Output() loadMoreData = new EventEmitter();

  constructor() {}

  ngOnInit() {
    console.log('ya me inicie..', this.tvRecientes)
  }

  async verDetalle(id: number) {

    const modal = await this.modalCtrl.create({
      component: TvDetalleComponent,
      componentProps:{
        id
      }
    })
    modal.present();
  }



  onScroll(event: any){
    if (this.isEndOfScroll(event)) {
      setTimeout(() => {
        this.loadMoreData.emit()
      }, 500);
    }
  }

  isEndOfScroll(event: any): boolean {
    return (
      event.target.scrollLeft + event.target.offsetWidth >= event.target.scrollWidth
    );
  }

}
