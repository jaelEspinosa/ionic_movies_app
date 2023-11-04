import { Component, ViewChild, inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Result } from '../interfaces/interfaces';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild( IonInfiniteScroll ) infiniteScroll!:IonInfiniteScroll;

  moviesSvc = inject( MoviesService )
  modalCtrl = inject ( ModalController )
  textoBuscar: string = '';
  ideas: Result[] = []
  totalPagesResponse: number = 0;
  isLoading = false;
  constructor() {

  }


buscarTimeout: any;

buscar ( event: any ){
  this.isLoading = true
  this.moviesSvc.resetSearchPage();
  const valor = event.target.value;

  clearTimeout(this.buscarTimeout);
  this.buscarTimeout = setTimeout(() => {
    this.moviesSvc.buscarPeliculas( valor )
    .subscribe(resp =>{
      this.totalPagesResponse = resp.total_pages;
      this.ideas = resp.results;
      console.log(resp.results)
      this.textoBuscar = valor;
    });

    this.isLoading = false;

  }, 1000);
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
  const modal = await this.modalCtrl.create({
    component: DetalleComponent,
    componentProps:{
      id
    }
  })
  modal.present();

}


}


