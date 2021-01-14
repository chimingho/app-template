import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PageNodeModel } from '@shared/page-node-model';


@Injectable({
  providedIn: 'root'
})
export class PageNodeService {

  constructor(private http: HttpClient) { }

  getPage(): Observable<PageNodeModel> {
    return this.http.get<PageNodeModel>('api/PageNodeModel');
  }

  getNextPage(typeCode): Observable<PageNodeModel> {

    //   const links = {
    //     { "GreetingWebIntro": "PercentUseOfVehicle" },
    //   { "PercentUseOfVehicle": "DriverEditCovered" },
    //   { "DriverEditCovered": "PhoneValidatePrimary" },
    //   { "PhoneValidatePrimary": "OdometerSummary" },
    //   { "OdometerSummary": "AddressChangeGaraging" },
    // }


    return this.http.get<PageNodeModel>('api/PageNodeModels?TypeCode=PercentUseOfVehicle').pipe(
      map((page, index) => {
        if (index == 0)
          return page[0];
      })
    )

  }
}
