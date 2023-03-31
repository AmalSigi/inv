import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStoService {
  constructor() {}

  LocalStoring!: any;

  public store(value: any) {
    this.LocalStoring = value;
    console.log(this.LocalStoring)
  }

  public getvalue() {
    return this.LocalStoring;
  }
}
