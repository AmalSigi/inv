import { Pipe, PipeTransform } from '@angular/core';
import { Observable, map } from 'rxjs';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {
  transform(items: Observable<any[]>, currentPage: number , pageSize: number) {

    // console.log('pipe'+currentPage)
    return items.pipe(
   map(paginated=>{
        const startIndex=(currentPage-1)*pageSize;
        const endindex=startIndex+pageSize
        return paginated.slice(startIndex,endindex)
      })
       )


       
}
}