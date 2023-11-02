import { Component, EventEmitter, Input, OnInit, Output, inject} from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Pelicula } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';
import { register } from 'swiper/element';
import { DetalleComponent } from '../detalle/detalle.component';



register();

@Component({
  selector: 'slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent  implements OnInit {

  moviesSvc = inject( MoviesService )
  modalCtrl = inject ( ModalController )
  urlImg = environment.imgUrl


  @Input() peliculas: Pelicula[] = [];
  @Input() isLoading: boolean = false;
  @Input() error: boolean = false;

  @Output() loadMoreData = new EventEmitter();


  constructor() {}

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
