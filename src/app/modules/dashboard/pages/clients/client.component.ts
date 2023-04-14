import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Iclient } from '@interface/iclient';
import { Toastr } from '@service/toastr.service';
import { Observable, Subscription, map, of } from 'rxjs';
import { ClientService } from '@clientservice/client.service';
import { MainServiceService } from '@service/main-service.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent {
  constructor(
    private readonly serviceApi: ClientService,
    private readonly toastr: Toastr,
    private readonly main: MainServiceService
  ) {}
  public clients$!: Observable<any>;
  public upClient: any;
  public clientView: any;
  public updateClientForm: FormGroup = new FormGroup({});
  public searchValue: any = '';

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

  public searchClient(event: any): void {
    this.searchValue = event.target.value;
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
