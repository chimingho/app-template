
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import model0 from '../../test_data/NICOA/GreetingWebIntroBlock.json';
import model1 from '../../test_data/NICOA/PercentUseOfVehicleBlock.json';
import model2 from '../../test_data/NICOA/DriverForm.json';
import model3 from '../../test_data/NICOA/PhoneValidatePrimary.json';
import model4 from '../../test_data/NICOA/OdometerSummaryBlock.json';
import model5 from '../../test_data/NICOA/AddressGaragingChangeListBlock.json';

import model from '../../test_data/PageNodeModel.json';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const models = [model0, model1, model2, model3, model4, model5];
    return { PageNodeModel: models[1], PageNodeModels: models, LogOnModel: {}, CarrierModel: {} };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  // genId(heroes: Hero[]): number {
  //   return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  // }
  // genId<T extends Hero | Crises>(myTable: T[]): number {
  //   return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  // }

}
