
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
//import model from '../../test_data/NICOA/PercentUseOfVehicleBlock.json';
import model from '../../test_data/PageNodeModel.json';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    return { PageNodeModel: model, LogOnModel: {}, CarrierModel: {} };
  }

}
