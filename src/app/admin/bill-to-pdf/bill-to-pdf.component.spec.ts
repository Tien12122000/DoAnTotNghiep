import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillToPDFComponent } from './bill-to-pdf.component';

describe('BillToPDFComponent', () => {
  let component: BillToPDFComponent;
  let fixture: ComponentFixture<BillToPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillToPDFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillToPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
