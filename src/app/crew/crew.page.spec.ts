import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewPage } from './crew.page';

describe('CrewPage', () => {
  let component: CrewPage;
  let fixture: ComponentFixture<CrewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
