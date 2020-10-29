import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import model from '../PageNodeModel.json';
import { CollectorList } from './page-node-model';


@Injectable({
  providedIn: 'root'
})
export class PageService{

  constructor(private http: HttpClient) { }

  
  getPage(){
    //return of(model);
    return this.http.get('api/model');
  }

  getCollectors() {

    const collectors: CollectorList[] = model.QuestionBlockList[3].CollectorList;

    return of(collectors.sort((a, b) => a.SortOrder - b.SortOrder));
  }


}
