import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Season } from 'src/app/interfaces/tv.interfaces';

@Component({
  selector: 'app-season-detail',
  templateUrl: './season-detail.component.html',
  styleUrls: ['./season-detail.component.scss'],
})
export class SeasonDetailComponent  implements OnInit {

  @Input() season!:Season;

  modalCtrl = inject ( ModalController )

  constructor() { }

  ngOnInit() {
    console.log(this.season)
  }

  onClick() {
    this.modalCtrl.dismiss()
  }

}
