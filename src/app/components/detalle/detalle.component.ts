import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { TvService } from 'src/app/services/tv.service';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent  implements OnInit {

  constructor() {

  }

  pelicula!: PeliculaDetalle;
  actores!: Cast[];

  textoOculto = 150;

  movieSvc = inject ( MoviesService)
  tvSvc = inject ( TvService )
  modalCtrl = inject ( ModalController )



  @Input() id!: number;


  ngOnInit() {

    this.movieSvc.getPeliculaDetalle( this.id)
     .subscribe( resp => {
       this.pelicula = resp;
       console.log('la pelicula es, ',this.pelicula)
     })

     this.movieSvc.getActoresPelicula( this.id)
     .subscribe( resp => {
       this.actores = resp.cast
       console.log(resp.cast)
     })

  }

  leerMas(){
   this.textoOculto = 5000
  }

 regresar (){
  this.modalCtrl.dismiss()
  }
 favoritos (){

 }

}
