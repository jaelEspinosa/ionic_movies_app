import { Component, Input, OnInit, inject } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent  implements OnInit {

  constructor() { }

  movieSvc = inject ( MoviesService)

  @Input() id!: number

  ngOnInit() {
    /* console.log('ID: ', this.id) */

   this.movieSvc.getPeliculaDetalle( this.id)
    .subscribe( resp => {
      console.log(resp)
    })
  }

}
