import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonService } from "./common.service";
import { UserService } from "./user.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private commonService : CommonService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUser = this.commonService.currentUser;
    if (currentUser) {
      let authdata = window.btoa(
        currentUser.username + ":" + currentUser.password
      );
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${authdata}`,
        },
      });
      return next.handle(request);
    } else {
      return next.handle(request);
    }
  }
}
