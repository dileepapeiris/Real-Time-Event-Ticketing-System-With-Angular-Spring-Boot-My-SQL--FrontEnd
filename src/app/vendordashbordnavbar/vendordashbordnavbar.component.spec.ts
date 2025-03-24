import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendordashbordnavbarComponent } from './vendordashbordnavbar.component';

describe('VendordashbordnavbarComponent', () => {
  let component: VendordashbordnavbarComponent;
  let fixture: ComponentFixture<VendordashbordnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendordashbordnavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendordashbordnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
