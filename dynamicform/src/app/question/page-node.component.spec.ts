import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNodeComponent } from './page-node.component';

describe('PageNodeComponent', () => {
  let component: PageNodeComponent;
  let fixture: ComponentFixture<PageNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
