import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSignupPromptComponent } from './common-signup-prompt.component';

describe('CommonSignupPromptComponent', () => {
  let component: CommonSignupPromptComponent;
  let fixture: ComponentFixture<CommonSignupPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonSignupPromptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonSignupPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
