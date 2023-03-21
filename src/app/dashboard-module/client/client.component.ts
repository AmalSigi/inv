import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/Service/http.service';
import { LocalStoService } from 'src/app/Service/local-sto.service';
import { Toastr } from 'src/app/Service/toastr.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  constructor(
    private readonly http: HttpClient, private serviceApi : HttpService,private toastr: Toastr,private router:Router, private local:LocalStoService
  ) {}
  public url: string = 'https://api-sales-app.josetovar.dev/clients';
  public clients$!: Observable<any>;
  public upClient:any
public clientView:any
  public updateClientForm: FormGroup = new FormGroup({});

  currentPage: number=1;
  pageSize: number=5;
  public showmodel:boolean = false
  ngOnInit(): void {
    this.clients$ = this.http.get<{
      first_name: string,
      last_name: string,
      address: string,
      city: string,
      state: string,
      country: string,
      phone: string,
      email: string
    }>(this.url);

    this.clients$.subscribe((res)=>{
    })
  }



  onPagination(event: { currentPage: number, pageSize: number }) {

  
    this.currentPage = event.currentPage;
    this.pageSize = event.pageSize;
  }


  delete(client: number ) {
    this.serviceApi.delectClient(client).subscribe((responses: any) => {
       this.http
        .get<any>(`${this.url}`)
        .subscribe((responses) => {
          this.clients$=of(responses);
        });

        this.toastr.delete()
    }); 
}



public modelShow(client:any){
  this.upClient=client
  this.showmodel=true
  
  }

  public modelUnShow(value:boolean){
  this.showmodel=value

  }
  
  public updateClient(value:boolean){
    if(value){
      this.serviceApi.getClients().subscribe((repo:any)=>{
        this.clients$=of(repo)
        this.toastr.update()
      })
    }
  }
public view(client:any){
  this.local.store(client)
}

}
