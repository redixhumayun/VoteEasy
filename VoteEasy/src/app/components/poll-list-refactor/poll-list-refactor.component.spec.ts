import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollListRefactorComponent } from './poll-list-refactor.component';

describe('PollListRefactorComponent', () => {
  let component: PollListRefactorComponent;
  let fixture: ComponentFixture<PollListRefactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollListRefactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollListRefactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
