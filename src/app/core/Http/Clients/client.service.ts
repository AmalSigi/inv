import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private readonly http: HttpClient) {}
  // ***************** Client Function**************************

  // *****
  public url: string = 'https://api-sales-app.josetovar.dev';

  public getClients(): Observable<any> {
    return this.http.get(`${this.url}/clients`);
  }

  public putClients(clients: any): Observable<any> {
    return this.http.put<any>(`${this.url}/clients`, clients);
  }

  public postClients(client: any): Observable<any> {
    return this.http.post<any>(`${this.url}/clients`, client);
  }

  public delectClient(client: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/clients/${client}`);
  }
}
