import { Component, OnInit, inject } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { TvService } from '../services/tv.service';

import { TvSeries } from '../interfaces/tv.interfaces';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  swiperModules = [ IonicSlides ] // importamos IonicSlides para poder usar las opciones de éste en swiper

  tvRecientes: TvSeries[] = [];
  tvPopulares: TvSeries[] = [];
  error: boolean = false

  public urlImg: string = ''
  constructor() {
    this.urlImg = environment.imgUrl

  }
  private tvSvc = inject ( TvService)



  ngOnInit() {
    this.tvSvc.getFeacture()
     .subscribe( resp => {
      this.tvRecientes = resp.results
    })
    this.loadPopulars()
  }

  loadMore(){
    /* console.log('cargando mas...') */

    this.loadPopulars()
  }

  loadPopulars() {
    this.tvSvc.getPopulars()
    .subscribe({
      next:
      resp => {

        const newPopulares = [...this.tvRecientes, ...resp.results]

        this.tvRecientes = newPopulares;


        /* console.log('populares: ', this.tvRecientes) */
        },
      error: err =>{
        console.log(err)
        this.error = true
      }
    }

    )
  }

}
