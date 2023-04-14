import { Injectable } from '@angular/core';
import { HttpService } from '../../Http/Common/http.service';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

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
