import { Component } from '@angular/core';
import { Toastr } from '@service/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '@clientservice/client.service';
import { MainServiceService } from '@service/main-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Iclient } from '@interface/client/iclient';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
})
export class AddClientComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly clientAcess: MainServiceService,
    private clientService: ClientService,
    private toastr: Toastr
  ) {}

  public addClientForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });
  public addClient(): void {
    this.clientService
      .postClients(this.addClientForm.value)
      .subscribe((response: Iclient) => {
        if (response) {
          this.toastr.add();
          this.clientService.getClients().subscribe((response: Iclient) => {
            this.clientAcess.clickEventActivated();
            this.addClientForm.reset();
          });
        }
      });

    this.route.queryParams.subscribe((params: { [source: string]: string }) => {
      if (params['source'])
        this.router.navigate(['/dashboard/sales'], {
          queryParams: { source: 'client' },
        });
    });
  }
}
