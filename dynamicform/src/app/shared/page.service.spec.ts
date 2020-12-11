import { of, throwError } from 'rxjs'
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PageNodeModel } from './page-node-model';
import { PageService } from './page.service';
import model from '../PageNodeModel.json';


fdescribe('PageService', () => {
  let service: PageService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PageService(httpClientSpy as any);

    //TestBed.configureTestingModule({});
    //service = TestBed.inject(PageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected heroes (HttpClient called once)', () => {
    const expectedModel: PageNodeModel = model;

    httpClientSpy.get.and.returnValue(of(expectedModel));

    service.getPage().subscribe(
      heroes => expect(heroes).toEqual(expectedModel, 'expected heroes'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
  
    httpClientSpy.get.and.throwError(errorResponse);
  
    service.getPage().subscribe(
      heroes => fail('expected an error, not heroes'),
      error  => {
        expect(error.status).toEqual(404, 'status');
        //expect(error.message).toContain('test 404 error');
      }
    );
  });

});
