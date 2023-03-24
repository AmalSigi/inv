import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
 sales: any[]=[]

 ngOnInit(){

  this.sales=[
    {id:'1',name:"amal"},
    {id:'2',name:"akshara"},
    {id:'3',name:"agnes"},
    {id:'4',name:"krish"},
  ]
 }
 onRefresh(){
  this.sales=[
    {id:'1',name:"amal"},
    {id:'2',name:"akshara"},
    {id:'3',name:"agnes"},
    {id:'4',name:"krish"},
    {id:'5',name:"Vishnu"},
  ]
 }
 onTrackBy(index:any,sales:any){
  return sales.id;
 }
}
