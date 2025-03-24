import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSalesChartComponent } from './ticket-sales-chart.component';

describe('TicketSalesChartComponent', () => {
  let component: TicketSalesChartComponent;
  let fixture: ComponentFixture<TicketSalesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketSalesChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketSalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
