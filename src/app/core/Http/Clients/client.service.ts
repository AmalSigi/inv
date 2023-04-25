import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { Iclient } from '@interface/client/iclient';
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private readonly http: HttpClient) {}
  // ***************** Client Function**************************

  // *****

  public getClients(): Observable<any> {
    return this.http.get(`${environment.url}/clients`);
  }

  public putClients(clients: Iclient): Observable<Iclient> {
    return this.http.put<Iclient>(`${environment.url}/clients`, clients);
  }

  public postClients(client: any): Observable<Iclient> {
    return this.http.post<Iclient>(`${environment.url}/clients`, client);
  }

  public delectClient(client: number): Observable<any> {
    return this.http.delete<any>(`${environment.url}/clients/${client}`);
  }
}
