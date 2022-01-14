import { Injectable, Injector } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthServiceService } from '../authService/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private injector: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): any{
    let service = this.injector.get(AuthServiceService)
    // clone to request
      let  tokenizedReq = req.clone({
        setHeaders:{
          Authorization: `${service.getToken()}`
        }
      })
      return next.handle(tokenizedReq)
  }
}
