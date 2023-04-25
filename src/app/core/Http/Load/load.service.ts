import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { ImportProductResponse } from '@interface/product/iproduct';
@Injectable({
  providedIn: 'root',
})
export class LoadService {
  constructor(private readonly http: HttpClient) {}

  public postProductFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('csv', fileToUpload, fileToUpload.name);
    return this.http.post<ImportProductResponse>(
      `${environment.url}/products/import`,
      formData
    );
  }

  public postClientFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('csv', fileToUpload, fileToUpload.name);
    return this.http.post<ImportProductResponse>(
      `${environment.url}/clients/import`,
      formData
    );
  }
}
