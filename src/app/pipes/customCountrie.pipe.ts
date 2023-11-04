import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customcountrie'
})
export class CustomCountriePipe implements PipeTransform {

  transform(value: string):string {
    let customCountryName;
    if (value === "United States of America"){
      customCountryName = 'USA'
    }else if(value === 'United Kingdom'){
      customCountryName = 'UK'
    }else{
      customCountryName = value
    }
    return customCountryName;
  }

}
