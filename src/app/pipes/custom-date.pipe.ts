import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(date: string): string {

    console.log(date)

   const year = date.split('-')[0]
   const month = date.split('-')[1]
   const day = date.split('-')[2]
   const spanishMonth = ['','Enero','febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
   const spanishDate = spanishMonth[Number (month)]+' de '+year;

    return spanishDate;
  }

}
