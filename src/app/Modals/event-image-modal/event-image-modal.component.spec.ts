import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventImageModalComponent } from './event-image-modal.component';

describe('EventImageModalComponent', () => {
  let component: EventImageModalComponent;
  let fixture: ComponentFixture<EventImageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventImageModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
