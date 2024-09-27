import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountService } from "../account/account.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private accountService: AccountService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isGraphQlRequest = req.url.includes('graphql') || req.body?.operationName;
        if (isGraphQlRequest) {
            const authToken = this.accountService.getToken();

            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${authToken}`)
            });

            return next.handle(authReq)
        }

        return next.handle(req);
    }

}

