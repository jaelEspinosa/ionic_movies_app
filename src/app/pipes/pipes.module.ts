import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesPipe } from './images.pipe';
import { ParesPipe } from './pares.pipe';



@NgModule({
  declarations: [
    ImagesPipe,
    ParesPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ImagesPipe,
    ParesPipe
  ]
})
export class PipesModule { }
