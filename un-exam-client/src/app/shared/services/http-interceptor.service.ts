import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ToastService } from './toast.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private commonService: CommonService,
    private toastService : ToastService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUser = this.commonService.currentUser;
    if (currentUser) {
      let authdata = window.btoa(
        currentUser.username + ':' + currentUser.password
      );
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${authdata}`,
        },
      });
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
          }
          this.toastService.error(errorMessage, "Error: ");
          return throwError(errorMessage);
        })
      );
    } else {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
          }
          this.toastService.error(errorMessage, "Error: ");
          return throwError(errorMessage);
        })
      );
    }
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
