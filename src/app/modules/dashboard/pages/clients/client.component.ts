import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, map, of } from 'rxjs';
import { Toastr } from '@service/toastr.service';
import { HttpService } from '@service/http.service';
import { LocalStoService } from '@service/local-sto.service';
import { MainServiceService } from '@service/main-service.service';
import { Iclient } from 'src/app/Shared/interface/iclient';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent {
  constructor(
    private readonly http: HttpClient,
    private readonly serviceApi: HttpService,
    private readonly toastr: Toastr,
    private readonly router: Router,
    private readonly local: LocalStoService,
    private readonly main: MainServiceService
  ) {}
  public url: string = 'https://api-sales-app.josetovar.dev/clients';
  public clients$!: Observable<any>;
  public upClient: any;
  public clientView: any;
  public updateClientForm: FormGroup = new FormGroup({});
  public searchValue!: any;

  currentPage: number = 1;
  pageSize: number = 5;
  public showmodel: boolean = false;

  public mainServiceSubscription: Subscription = this.main
    .getClickEvent()
    .subscribe(() => {
      this.getClient();
    });

  ngOnInit(): void {
    this.getClient();
  }

  private getClient(): void {
    this.clients$ = this.serviceApi.getClients();
  }

  public onPagination(event: { currentPage: number; pageSize: number }): void {
    this.currentPage = event.currentPage;
    this.pageSize = event.pageSize;
  }

  delete(client: number): void {
    this.serviceApi.delectClient(client).subscribe((responses: any) => {
      this.getClient();
      this.toastr.delete();
    });
  }

  public modelShow(client: Iclient): void {
    this.upClient = client;
    this.showmodel = true;
  }

  public modelUnShow(value: boolean): void {
    this.showmodel = value;
  }

  public updateClient(value: boolean): void {
    if (value) {
      this.serviceApi.getClients().subscribe((repo: any) => {
        this.clients$ = of(repo);
        this.toastr.update();
      });
    }
  }

  public searchClient(): void {
    this.clients$ = this.clients$.pipe(
      map((clients: any) => {
        return clients.filter(
          (client: any) =>
            client.first_name
              .toLowerCase()
              .includes(this.searchValue.toLowerCase()) ||
            client.last_name
              .toLowerCase()
              .includes(this.searchValue.toLowerCase())
        );
      })
    );
  }
}
