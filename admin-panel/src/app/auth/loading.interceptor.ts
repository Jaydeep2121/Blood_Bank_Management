import { Injectable,Injector } from '@angular/core';
import { AuthService } from './auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private injector:Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authService=this.injector.get(AuthService);
    let tokenizedReq=request.clone({
      setHeaders:{
        Authorization:`Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
