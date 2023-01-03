import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        const token = localStorage.getItem('token');
        const url = req.url;

        if (token && this.secureEndpoint(url)) {
            console.log(url);
            req = req.clone({
                setHeaders: {
                    Authorization: "Bearer " + token,
                }
            })
        }
        return next.handle(req);
    }

    secureEndpoint(url: string): boolean {
        return !url.endsWith("auth") || !url.endsWith("cadastrar-pf") || !url.endsWith("cadastrar-pj");
    }
}