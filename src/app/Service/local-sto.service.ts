import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoService {

  constructor() { }

LocalStoring!:any

public store(value:any){
  this.LocalStoring=value

}

public getvalue(){
  return this.LocalStoring
}

}
