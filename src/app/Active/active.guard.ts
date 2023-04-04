import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { HttpService } from '../Service/http.service';

@Injectable({
  providedIn: 'root',
})
export class ActiveGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly apiService: HttpService,
    private readonly router: Router
  ) {}

  public getAuth() {
    this.apiService.getAuth().subscribe({
      next: () => {},
      error: () => {
        this.router.navigate(['/login']);
        return false;
      },
      complete: () => true,
    });
  }
  canActivate(): any {
    this.getAuth();
  }

  canActivateChild(): any {
    this.getAuth();
  }
}
