import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import model from '../PageNodeModel.json';
import { CollectorList, PageNodeModel } from './page-node-model';


@Injectable({
  providedIn: 'root'
})
export class PageService{

  constructor(private http: HttpClient) { }

  
  getPage(): Observable<PageNodeModel>{
    //return of(model);
    return this.http.get<PageNodeModel>('api/SecondModal');
  }

  getCollectors() {

    const collectors: any = model.QuestionBlockList[3].CollectorList;

    return of(collectors.sort((a, b) => a.SortOrder - b.SortOrder));
  }


}
