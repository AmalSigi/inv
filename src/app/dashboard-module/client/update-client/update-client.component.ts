import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/Service/http.service';

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
    private apiService: HttpService,  
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
      this.apiService.putClients(this.updateClientForm.value).subscribe((response: any) => {
        if (response) {
          this.clientEvent.emit(response);
          const value: boolean = false;
          this.childEvent.emit(value);
        }
      });
  }
}
