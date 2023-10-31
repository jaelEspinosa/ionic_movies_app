import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject} from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';
import { register } from 'swiper/element';



register();

@Component({
  selector: 'slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent  implements OnInit {

  moviesSvc = inject( MoviesService )
  urlImg = environment.imgUrl
  @ViewChild( IonInfiniteScroll, { static:true } ) infiniteScroll!: IonInfiniteScroll; // añadiendo { static:true } al @ViewChild evitamos que éste
  // sea undefined en el ngOnInit()

  @Input() peliculas: Pelicula[] = [];
  @Input() isLoading: boolean = false;
  @Input() error: boolean = false;

  @Output() loadMoreData = new EventEmitter();


  constructor() {}

  ngOnInit() {}

 onClick(pelicula:Pelicula) {
    console.log('diste click en :', pelicula.title)
 }

  loadMore(){
    setTimeout(() => {
      this.infiniteScroll.complete();
    }, 700);
  }

  onScroll(event: any){
    if (this.isEndOfScroll(event)) {
      setTimeout(() => {
        this.loadMoreData.emit()
      }, 500);
    }
  }

  isEndOfScroll(event: any): boolean {
    return (
      event.target.scrollLeft + event.target.offsetWidth >= event.target.scrollWidth
    );
  }
}
