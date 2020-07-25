import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VericationSuccessPageComponent } from './verication-success-page.component';

describe('VericationSuccessPageComponent', () => {
  let component: VericationSuccessPageComponent;
  let fixture: ComponentFixture<VericationSuccessPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VericationSuccessPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VericationSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
