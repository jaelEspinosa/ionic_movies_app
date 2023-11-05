import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, Season, TvDetalle } from 'src/app/interfaces/tv.interfaces';
import { TvService } from 'src/app/services/tv.service';
import { SeasonDetailComponent } from '../season-detail/season-detail.component';

@Component({
  selector: 'app-tv-detalle',
  templateUrl: './tv-detalle.component.html',
  styleUrls: ['./tv-detalle.component.scss'],
})
export class TvDetalleComponent  implements OnInit {

  constructor() { }

  serie!: TvDetalle;
  actores!: Cast[];

  textoOculto = 150;

  tvSvc = inject ( TvService)
  modalCtrl = inject ( ModalController )



  @Input() id!: number

  ngOnInit() {
    /* console.log('ID: ', this.id) */

   this.tvSvc.getPeliculaDetalle( this.id)
    .subscribe( resp => {
      this.serie = resp;
      console.log('la pelicula es, ',this.serie)
      console.log('temporadas ',this.serie.seasons)
    })

    this.tvSvc.getActoresPelicula( this.id)
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

 async showSeason(season :Season) {



  const seasonModal = await this.modalCtrl.create({
    component: SeasonDetailComponent,
    componentProps: {season}

  })
    seasonModal.present()
 }

}
