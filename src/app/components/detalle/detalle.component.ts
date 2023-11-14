import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';
import { DetalleActorsComponent } from '../detalle-actors/detalle-actors.component';
import { ActoresDetalle } from 'src/app/interfaces/actors';
import { ActorsService } from 'src/app/services/actors.service';



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

  private movieSvc = inject ( MoviesService)
  public  dataSvc = inject ( DataLocalService )
  private modalCtrl = inject ( ModalController )


  public icon = 'star-outline'
  public textIcon = 'Favorito'

  private _existe = false;


  @Input() id!: number;


  async ngOnInit() {

   this._existe = await this.dataSvc.existePelicula( this.id );
   this.icon = this._existe ? 'star' : 'star-outline';
   this.textIcon = this._existe ? 'Quitar' : 'Favorito';

    this.movieSvc.getPeliculaDetalle( this.id)
     .subscribe( resp => {
       this.pelicula = resp;
     })

     this.movieSvc.getActoresPelicula( this.id)
     .subscribe( resp => {
       this.actores = resp.cast
       console.log('los actores son',this.actores)
     })

  }

  leerMas(){
   this.textoOculto = 5000
  }

 regresar (){
  this.modalCtrl.dismiss()
  }

 async favoritos (){
   const existe = await this.dataSvc.guardarPelicula( this.pelicula );

   this.icon = existe ? this.icon = 'star' : 'star-outline';
   this.textIcon = existe ? this.textIcon = 'Quitar' : 'Favorito';

 }




async detalleActor(id: number) {


  const modal = await this.modalCtrl.create({
    component: DetalleActorsComponent,
    componentProps:{
      id
    }
  })
  modal.present();
 }

}
