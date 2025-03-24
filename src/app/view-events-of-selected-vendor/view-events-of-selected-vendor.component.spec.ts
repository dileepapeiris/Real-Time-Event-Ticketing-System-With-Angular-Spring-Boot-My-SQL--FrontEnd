import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventsOfSelectedVendorComponent } from './view-events-of-selected-vendor.component';

describe('ViewEventsOfSelectedVendorComponent', () => {
  let component: ViewEventsOfSelectedVendorComponent;
  let fixture: ComponentFixture<ViewEventsOfSelectedVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEventsOfSelectedVendorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEventsOfSelectedVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
