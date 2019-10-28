import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxLocalStateComponent } from './redux-local-state.component';

describe('ReduxLocalStateComponent', () => {
  let component: ReduxLocalStateComponent;
  let fixture: ComponentFixture<ReduxLocalStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReduxLocalStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxLocalStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
