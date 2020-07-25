import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBooksForVerificationComponent } from './get-books-for-verification.component';

describe('GetBooksForVerificationComponent', () => {
  let component: GetBooksForVerificationComponent;
  let fixture: ComponentFixture<GetBooksForVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetBooksForVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBooksForVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
