import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketSoldHistoryComponent } from './view-ticket-sold-history.component';

describe('ViewTicketSoldHistoryComponent', () => {
  let component: ViewTicketSoldHistoryComponent;
  let fixture: ComponentFixture<ViewTicketSoldHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTicketSoldHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTicketSoldHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
