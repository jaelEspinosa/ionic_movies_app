import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesPipe } from './images.pipe';
import { ParesPipe } from './pares.pipe';
import { CustomDatePipe } from './custom-date.pipe';
import { CustomCountriePipe } from './customCountrie.pipe';
import { OrdenarPorGeneroPipe } from './ordenar-por-genero.pipe';
import { OrdenarTvPorGeneroPipe } from './ordenar-tv-por-genero.pipe';




@NgModule({
  declarations: [
    ImagesPipe,
    ParesPipe,
    CustomDatePipe,
    CustomCountriePipe,
    OrdenarPorGeneroPipe,
    OrdenarTvPorGeneroPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ImagesPipe,
    ParesPipe,
    CustomDatePipe,
    CustomCountriePipe,
    OrdenarPorGeneroPipe,
    OrdenarTvPorGeneroPipe

  ]
})
export class PipesModule { }
