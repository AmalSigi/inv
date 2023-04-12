import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@service/http.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss'],
})
export class ClientViewComponent {
  public clientid: any;
  public client!: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: HttpService,
    private readonly route: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.clientid = +params['id'];
    });

    this.apiService.getClients().subscribe((respo: any[]) => {
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
