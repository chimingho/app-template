import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import model from '../PageNodeModel.json';
import { CollectorList } from './page-node-model';


@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() { }


  getPage(){
    return of(model);
  }

  getCollectors() {

    const collectors: CollectorList[] = model.QuestionBlockList[3].CollectorList;

    return of(collectors.sort((a, b) => a.SortOrder - b.SortOrder));
  }

}
