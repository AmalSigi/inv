import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  constructor(private readonly http: HttpClient) {}
  public url: string = 'https://api-sales-app.josetovar.dev';

  postProductFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('csv', fileToUpload, fileToUpload.name);
    return this.http.post(`${this.url}/products/import`, formData);
  }

  postClientFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('csv', fileToUpload, fileToUpload.name);
    return this.http.post(`${this.url}/clients/import`, formData);
  }
}
