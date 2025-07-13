import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { apiUrl } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BaseService {
    // notification = inject(NzNotificationService);
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = apiUrl
    }

    private getUrl(path: string): string {
        return this.baseUrl + path;
    }

    get(path: string, options?: any, baseUrl?: string): Observable<any> {
        let url: string;
        baseUrl ? url = baseUrl + path : url = this.getUrl(path);

        if (options) {
            return this.http.get(url, options).pipe(
                map((response: any) => {
                    return response;
                }),
                retry(1),
                //catchError(this.handleError)
            );
        } else {
            return this.http.get(url).pipe(
                map((response: any) => {
                    return response;
                }),
                retry(1),
                //catchError(this.handleError)
            );
        }
    }

    delete(path: string, options?: any, baseUrl?: string): Observable<any> {
        let url: string;
        baseUrl ? url = baseUrl + path : url = this.getUrl(path);

        if (options) {
            return this.http.delete(url, options).pipe(
                map((response: any) => {
                    return response;
                }),
                retry(1),
                //catchError(this.handleError)
            );
        } else {
            return this.http.delete(url).pipe(
                map((response: any) => {
                    return response;
                }),
                retry(1),
                //catchError(this.handleError)
            );
        }
    }

    post(path: string, postBody: any, options?: any, baseUrl?: string): Observable<any> {
        let url: string;
        baseUrl ? url = baseUrl + path : url = this.getUrl(path);

        if (options) {
            return this.http.post(url, postBody, options).pipe(
                map((response: any) => {
                    return response;
                }),
                //catchError(this.handleError)
            );
        } else {
            return this.http.post(url, postBody).pipe(
                map((response: any) => {
                    return response;
                }),
                //catchError(res => this.handleError(res))
            );
        }
    }

    put(path: string, putBody: any, options?: any, baseUrl?: string): Observable<any> {
        let url: string;
        baseUrl ? url = baseUrl + path : url = this.getUrl(path);

        if (options) {

            return this.http.put(url, putBody, options).pipe(
                map((response: any) => {
                    return response;
                }),
                retry(1),
                //catchError(this.handleError)
            );
        } else {
            return this.http.put(url, putBody).pipe(
                map((response: any) => {
                    return response;
                }),
                retry(1),
                //catchError(this.handleError)
            );
        }
    }

}
