import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { InterceptorError } from '../models/interceptorErrorDto';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(
        private router: Router         
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            filter(e => e.type !== 0),
            catchError(error => this.setErrorMessage(error))
        );
    }

    private setErrorMessage(error: HttpErrorResponse): Observable<never> {
        console.log("Error at interceptor");
        console.log(error);
        
        let errorIntercepted: InterceptorError[] = [];

        if (error.status == HttpStatusCode.BadRequest) {
            errorIntercepted.push({code: error.status, message: error.error?.title})
        }

        if (error.status == HttpStatusCode.InternalServerError) {
            errorIntercepted.push({code: error.status, message: "Internal server error!"})
        }

        if (error.status == HttpStatusCode.Unauthorized || error.status == HttpStatusCode.Forbidden) {
            this.router.navigateByUrl('/login');
            errorIntercepted.push({ code: error.status, message: "Unauthorized request!" })            
        }

        return throwError(() => {
            if (errorIntercepted.length == 0) {
                return [{
                    code: error.status,
                    message: "Unknown Error Occurred!"
                }];
            } else {
                return errorIntercepted;
            }
        });
    }
}

