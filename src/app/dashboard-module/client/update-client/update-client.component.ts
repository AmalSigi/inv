import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/Service/http.service';
import { ClientComponent } from '../client.component';
import { ToastrService } from 'ngx-toastr';
import { Toastr } from 'src/app/Service/toastr.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss'],
})
export class UpdateClientComponent implements OnChanges {
  @Input() data?: any;
  clients$: any;
  @Output() childEvent = new EventEmitter<boolean>();
  @Output() clientEvent = new EventEmitter<any>();
  public updateClientForm!: FormGroup;

  constructor(
    private readonly http: HttpClient,
    private apiService: HttpService,
    private recall: ClientComponent,
    private toastr: Toastr
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateClientForm = new FormGroup({
        id: new FormControl(this.data.id),
        first_name: new FormControl(this.data.first_name),
        last_name: new FormControl(this.data.last_name),
        address: new FormControl(this.data.address),
        city: new FormControl(this.data.city),
        state: new FormControl(this.data.state),
        country: new FormControl(this.data.country),
        phone: new FormControl(this.data.phone),
        email: new FormControl(this.data.email),
      });
    }
  }

  public modelUnShow() {
    const value: boolean = false;
    this.childEvent.emit(value);
  }

  public editClient() {
    const url: string = 'https://api-sales-app.josetovar.dev/clients';
    this.http
      .put(url, this.updateClientForm.value)
      .subscribe((response: any) => {
        if (response) {
          this.clientEvent.emit(response);
          const value: boolean = false;
          this.childEvent.emit(value);
        }
      });
  }
}
