import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private username: string = '';

    // constructor
    constructor(
        private http: HttpClient,
        private _storageService: StorageService,
    ) { }


    private handleError(error: Response): Observable<Response> {
        return throwError(error);
    }

    private handleErrorPost(error: HttpErrorResponse): Observable<any> {
        return throwError(error.error);
    }

    private getToken() {
        const object = {};
        const user: User = this._storageService.getInfoUser();
        if (user) {
            this.username = user.user;
        }
        return object;
    }

    // ======================================= public methods ==============================================
    public post(urlDirAndPage: string, params?: HttpParams): Observable<any> {
        //if (environment.baseApiUrl) {
            const objHeader = this.getToken();
            const reqOptions: any = { headers: new HttpHeaders(objHeader) };

            if (params) { 
                params = params.set('UsernameAudit', this.username); 
            }

            return this.http.post(`${environment.baseApiUrl}${urlDirAndPage}`, params, reqOptions)
                .pipe(catchError(e => this.handleErrorPost(e)));
        //}
    }

    public get(urlDirAndPage: string, paramsSearch?: HttpParams): Observable<any> {
        //if (environment.baseApiUrl) {
            const objHeader = this.getToken();
            const reqOptions: any = { params: paramsSearch, headers: new HttpHeaders(objHeader) };

            return this.http.get(`${environment.baseApiUrl}${urlDirAndPage}`, reqOptions)
                .pipe(catchError(e => this.handleError(e)));
        //}
    }

    public apiPost(urlDirAndPage: string, body: any): Observable<any> {
        const options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        this.getToken();
        // Add Username
        body.UsernameAudit = this.username;
        const jsonBody = JSON.stringify(body);

        //if (environment.baseApiUrl) {
            return this.http.post(`${environment.baseApiUrl}${urlDirAndPage}`, jsonBody, options).pipe(catchError(e => this.handleError(e)));
        //}
    }

    public localGet(urlDirAndPage: string, paramsSearch?: HttpParams): Observable<any> {
        const reqOptions: any = { params: paramsSearch };
        return this.http.get(urlDirAndPage, reqOptions).pipe(catchError(e => this.handleError(e)));
    }

}
