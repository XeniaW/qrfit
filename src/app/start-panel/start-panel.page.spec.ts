import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPanelPage } from './start-panel.page';

describe('StartPanelPage', () => {
  let component: StartPanelPage;
  let fixture: ComponentFixture<StartPanelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartPanelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
