import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxGlobalStateComponent } from './redux-global-state.component';

describe('ReduxGlobalStateComponent', () => {
  let component: ReduxGlobalStateComponent;
  let fixture: ComponentFixture<ReduxGlobalStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReduxGlobalStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxGlobalStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
