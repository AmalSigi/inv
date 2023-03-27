import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/Service/http.service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  public sales$!:Observable<any>
  public showmodel: boolean = false;
 constructor(private readonly apiService:HttpService){}
 ngOnInit(): void {
  this.mainCall()
 }

 public mainCall(){
  this.sales$=this.apiService.getSale()
  this.sales$.subscribe((respo)=>{
    console.log(respo)
  })
 }
public convDate(date:any){
}

public modelShow() {
  // this.upClient = client;
  this.showmodel = true;
}

public modelUnShow(value: boolean) {
  this.showmodel = value;
}
}
