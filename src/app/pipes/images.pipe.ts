import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {


  transform(image: string, sice: string = "w500"): string {

    if(!image) {
      return './assets/no-image.jpg';
    }
    const imgUrl = `${environment.imgUrl}/${sice}/${image}`
    return imgUrl
  }

}
