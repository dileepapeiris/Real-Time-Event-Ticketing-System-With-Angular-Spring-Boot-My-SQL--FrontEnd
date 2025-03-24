import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventsOfAllVendorsComponent } from './view-events-of-all-vendors.component';

describe('ViewEventsOfAllVendorsComponent', () => {
  let component: ViewEventsOfAllVendorsComponent;
  let fixture: ComponentFixture<ViewEventsOfAllVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEventsOfAllVendorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEventsOfAllVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
