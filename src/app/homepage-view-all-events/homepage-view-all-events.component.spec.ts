import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageViewAllEventsComponent } from './homepage-view-all-events.component';

describe('HomepageViewAllEventsComponent', () => {
  let component: HomepageViewAllEventsComponent;
  let fixture: ComponentFixture<HomepageViewAllEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageViewAllEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageViewAllEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
