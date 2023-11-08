import { Component, ViewChild, inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Result } from '../interfaces/interfaces';

import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { TvService } from '../services/tv.service';
import { TvDetalleComponent } from '../components/tv-detalle/tv-detalle.component';
import { TvResults } from '../interfaces/tv.interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild( IonInfiniteScroll ) infiniteScroll!:IonInfiniteScroll;

  moviesSvc = inject( MoviesService )
  tvSvc = inject( TvService )
  modalCtrl = inject ( ModalController )

  type: string = 'movie';
  onOf: boolean = false;
  textoBuscar: string = '';
  ideas: Result[] = [];
  ideasTv : TvResults []= [];
  totalPagesResponse: number = 0;
  isLoading = false;
  isSearched = false;
  constructor() {

  }


buscarTimeout: any;

buscar ( event: any ){
  this.isLoading = true;
  this.isSearched = false;
  this.moviesSvc.resetSearchPage();
  this.tvSvc.resetSearchPage();
  const valor = event.target.value;
  clearTimeout(this.buscarTimeout);

  if (this.type === 'movie'){
     this.buscarTimeout = setTimeout(() => {
      this.moviesSvc.buscarPeliculas( valor )
      .subscribe(resp =>{
        this.totalPagesResponse = resp.total_pages;
        this.ideas = resp.results;
        console.log(resp.results)
        this.textoBuscar = valor;
      });

      this.isLoading = false;
      setTimeout(() => {
        if(this.textoBuscar.length > 0){
          this.isSearched = true;
        }
      }, 300);
    }, 1000);
  }else{
    this.buscarTimeout = setTimeout(() => {
      this.tvSvc.buscarPeliculas( valor )
      .subscribe(resp =>{
        this.totalPagesResponse = resp.total_pages;
        this.ideasTv = resp.results;
        console.log(resp.results)
        this.textoBuscar = valor;
      });

      this.isLoading = false;
      setTimeout(() => {
        if(this.textoBuscar.length > 0){
          this.isSearched = true;
        }
      }, 300);
    }, 1000);
  }
}

buscarMas( ) {
  console.log(this.textoBuscar)

  setTimeout(() => {
    this.moviesSvc.buscarPeliculas(this.textoBuscar)
     .subscribe({
      next: resp => {
        this.ideas.push(...resp.results)
        if(this.infiniteScroll){
          this.infiniteScroll.complete();
        }
      },
      error: err => {
        console.log(err)
        this.infiniteScroll.disabled = true
      }
     })
  }, 500);
}


 async onClickIdea( id: number ){

  if (this.type ==='movie'){
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

ToggleChanged(){
    this.textoBuscar = '';
    this.ideas = [];
    this.ideasTv = [];
    this.isSearched=false;

    if (this.onOf) {
    this.type = 'tv';
  }else{
    this.type = 'movie';
  }
}

}


