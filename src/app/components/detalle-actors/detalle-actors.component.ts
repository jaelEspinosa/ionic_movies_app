import { Component, Input, OnInit, inject } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { ActoresDetalle } from 'src/app/interfaces/actors';
import { ActorsService } from 'src/app/services/actors.service';

@Component({
  selector: 'app-detalle-actors',
  templateUrl: './detalle-actors.component.html',
  styleUrls: ['./detalle-actors.component.scss'],
})
export class DetalleActorsComponent  implements OnInit {

  constructor() { }

@Input() id!: number;

actorSvc = inject ( ActorsService );
private iab = inject ( InAppBrowser );
private platform = inject( Platform );
private modalCtrl = inject ( ModalController );
public actor!: ActoresDetalle;

public textoOculto = 150

  ngOnInit() {
   this.actorSvc.getActorDetalle(this.id)
    .subscribe(resp =>{
      this.actor = resp
      console.log(this.actor)
    })
  }
  leerMas(){
   this.textoOculto = 1500;
  }

  closeModal() {
    this.modalCtrl.dismiss()
  }

  onClickBrowser(){

    if(this.platform.is('ios') || this.platform.is('android')){
       const browser = this.iab.create( this.actor.homepage)
       browser.show();
       return;
    }
    window.open(this.actor.homepage, '_blank')
  }

}
