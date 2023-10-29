import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle'


register(); //llamar esta funcion para iniciar el swiper.

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
