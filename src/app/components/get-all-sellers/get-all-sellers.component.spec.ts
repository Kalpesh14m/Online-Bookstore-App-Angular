import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllSellersComponent } from './get-all-sellers.component';

describe('GetAllSellersComponent', () => {
  let component: GetAllSellersComponent;
  let fixture: ComponentFixture<GetAllSellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAllSellersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
