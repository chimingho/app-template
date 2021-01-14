import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFormCollectorComponent } from './question-form-collector.component';

describe('QuestionFormCollectorComponent', () => {
  let component: QuestionFormCollectorComponent;
  let fixture: ComponentFixture<QuestionFormCollectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionFormCollectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
