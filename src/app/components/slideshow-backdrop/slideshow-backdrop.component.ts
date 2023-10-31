import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent  implements OnInit {

  @Input() peliculas: Pelicula [] =[]
  constructor() { }

  ngOnInit() {}


  onclick(pelicula:Pelicula) {
    console.log('diste click en ', pelicula.title)
  }
}
