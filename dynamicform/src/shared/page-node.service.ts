import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PageNodeModel } from './page-node-model';


@Injectable({
  providedIn: 'root'
})
export class PageNodeService {

  constructor(private http: HttpClient) { }

  getPage(): Observable<PageNodeModel> {
    return this.http.get<PageNodeModel>('api/PageNodeModel');
  }

}
