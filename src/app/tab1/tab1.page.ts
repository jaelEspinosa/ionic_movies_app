import { Component, OnInit, inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

import { environment } from 'src/environments/environment';
import { IonicSlides } from '@ionic/angular';  // importamos IonicSlides para poder usar las opciones de éste en swiper




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  swiperModules = [ IonicSlides ] // importamos IonicSlides para poder usar las opciones de éste en swiper

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];
  error: boolean = false

  public urlImg: string = ''
  constructor() {
    this.urlImg = environment.imgUrl

  }
  private movieSvc = inject ( MoviesService )



  ngOnInit() {
    this.movieSvc.getFeacture()
     .subscribe( resp => {
      this.peliculasRecientes = resp.results
    })
    this.loadPopulars()
  }

  loadMore(){
    console.log('cargando mas...')

    this.loadPopulars()
  }

  loadPopulars() {
    this.movieSvc.getPopulars()
    .subscribe({
      next:
      resp => {

        const newPopulares = [...this.populares, ...resp.results]

        this.populares = newPopulares;


        console.log('populares: ', this.populares)
        },
      error: err =>{
        console.log(err)
        this.error = true
      }
    }

    )
  }

}
