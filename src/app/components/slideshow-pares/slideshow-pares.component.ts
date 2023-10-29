import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent  implements OnInit {

  @Input() peliculas: Pelicula[] = []


  constructor() { }

  ngOnInit() {}

  loadMore(){
    console.log('vamos a cargar mas pelis...')
  }

}
