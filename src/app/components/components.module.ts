import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';
import { DetalleComponent } from './detalle/detalle.component';
import { SlideTvShowBakdropComponent } from './slide-tv-show-bakdrop/slide-tv-show-bakdrop.component';
import { SlideTvShowPosterComponent } from './slide-tv-show-poster/slide-tv-show-poster.component';
import { SlideTvShowParesComponent } from './slide-tv-show-pares/slide-tv-show-pares.component';
import { TvDetalleComponent } from './tv-detalle/tv-detalle.component';
import { SeasonDetailComponent } from './season-detail/season-detail.component';




@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA   // importacion necesaria para el swiperSlide.
  ],
  declarations: [
    SlideTvShowPosterComponent,
    SlideTvShowParesComponent,
    SlideTvShowBakdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    SlideshowBackdropComponent,
    DetalleComponent,
    TvDetalleComponent,
    SeasonDetailComponent
  ],
  exports:[
    SlideTvShowPosterComponent,
    SlideTvShowParesComponent,
    SlideTvShowBakdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    SlideshowBackdropComponent,
    DetalleComponent,
    TvDetalleComponent,
    SeasonDetailComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,

  ]
})
export class ComponentsModule { }
