import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesPipe } from './images.pipe';
import { ParesPipe } from './pares.pipe';
import { CustomDatePipe } from './custom-date.pipe';
import { CustomCountriePipe } from './customCountrie.pipe';




@NgModule({
  declarations: [
    ImagesPipe,
    ParesPipe,
    CustomDatePipe,
    CustomCountriePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ImagesPipe,
    ParesPipe,
    CustomDatePipe,
    CustomCountriePipe

  ]
})
export class PipesModule { }
