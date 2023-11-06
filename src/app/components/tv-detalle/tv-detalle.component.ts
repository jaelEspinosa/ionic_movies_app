import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Cast, Season, TvDetalle } from 'src/app/interfaces/tv.interfaces';
import { TvService } from 'src/app/services/tv.service';
import { SeasonDetailComponent } from '../season-detail/season-detail.component';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

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

  private tvSvc = inject ( TvService)
  private modalCtrl = inject ( ModalController )
  private iab = inject ( InAppBrowser)
  private platform = inject( Platform )



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
onClickBrowser(){

  if(this.platform.is('ios') || this.platform.is('android')){
     const browser = this.iab.create( this.serie.homepage)
     browser.show();
     return;
  }
  window.open(this.serie.homepage, '_blank')
}

}
