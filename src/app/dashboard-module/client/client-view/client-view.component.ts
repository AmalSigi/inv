import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})

export class ClientViewComponent {


  @Input() clientView:any
}
