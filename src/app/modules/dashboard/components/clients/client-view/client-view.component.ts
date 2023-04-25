import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '@clientservice/client.service';
import { Iclient } from '@interface/client/iclient';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
})
export class ClientViewComponent {
  public clientid: any;
  public client!: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private readonly route: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.clientid = +params['id'];
    });

    this.clientService.getClients().subscribe((respo: Iclient[]) => {
      for (let client of respo) {
        if (this.clientid == client.id) {
          this.client = client;
        }
      }
    });
  }
  public back() {
    this.route.navigate(['/dashboard/client']);
  }
}
