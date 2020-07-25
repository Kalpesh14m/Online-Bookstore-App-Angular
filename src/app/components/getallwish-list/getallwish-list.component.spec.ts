import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallwishListComponent } from './getallwish-list.component';

describe('GetallwishListComponent', () => {
  let component: GetallwishListComponent;
  let fixture: ComponentFixture<GetallwishListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetallwishListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetallwishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
