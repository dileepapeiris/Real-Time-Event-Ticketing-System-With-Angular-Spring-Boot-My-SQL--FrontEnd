import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSoldHistoryComponent } from './ticket-sold-history.component';

describe('TicketSoldHistoryComponent', () => {
  let component: TicketSoldHistoryComponent;
  let fixture: ComponentFixture<TicketSoldHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketSoldHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketSoldHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
