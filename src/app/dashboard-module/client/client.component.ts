import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/Service/http.service';
import { PaginationComponent } from 'src/app/pagination/pagination.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  constructor(
    private readonly http: HttpClient,private toastr: ToastrService, private serviceApi : HttpService
  ) {}
  public url: string = 'https://api-sales-app.josetovar.dev/clients';
  public clients$!: Observable<any>;

  public updateClientForm: FormGroup = new FormGroup({});

  currentPage: number=1;
  pageSize: number=5;

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
      // console.log(res)
    })
  }



  onPagination(event: { currentPage: number, pageSize: number }) {
    // console.log("dash"+this.currentPage)
    // console.log("dash2"+event.currentPage)
  
    this.currentPage = event.currentPage;
    this.pageSize = event.pageSize;
  }


  delete(client: number ) {
    this.serviceApi.delectData(client).subscribe((responses: any) => {
       this.http
        .get<any>(`${this.url}`)
        .subscribe((responses) => {
          this.clients$=of(responses);
        });
    }); 
}

}
