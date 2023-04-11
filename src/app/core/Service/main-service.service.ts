import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  constructor() { }

  private subject = new Subject<any>()
  
  clickEventActivated(){
    this.subject.next(true)
  }

  getClickEvent():Observable<any>{
    return this.subject.asObservable();
  }
}
