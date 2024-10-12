import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptorFn } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../services";

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService){}
    
    intercept( request: HttpRequest<any>, next: HttpHandler ):Observable<HttpEvent<any>> {

        if(this.tokenService.hasToken()){
            const token = this.tokenService.returnToken();
            const headers = new HttpHeaders().append('Authorization', 'Bearer ' + token);
            request = request.clone({headers});
        } 
        return next.handle(request);
    }
}
/*@Injectable()
export class Interceptor implements HttpInterceptorFn  {
  constructor(private tokenService: TokenService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.tokenService.returnToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });

    return next.handle(authReq);
  }
}*/