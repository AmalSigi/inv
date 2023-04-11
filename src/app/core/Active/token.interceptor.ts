import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const access_token = JSON.parse(
      localStorage.getItem('access_token') || '{}'
    );

    if (!request.url.includes('login')) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      return next.handle(authReq).pipe(catchError(this.handleErrors));
    } else {
      return next.handle(request);
    }
  }

  handleErrors(error: HttpErrorResponse) {
    switch (error.status) {
      case 401:
        return throwError(() => new Error('Not authorized'));
      default:
        return throwError(() => new Error('Error!'));
    }
  }
}
