import { Component } from '@angular/core';
import { NavbarCommonComponent } from '../navbar-common/navbar-common.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-common-signup-prompt',
  standalone: true,
  imports: [NavbarCommonComponent,CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './common-signup-prompt.component.html',
  styleUrl: './common-signup-prompt.component.css'
})
export class CommonSignupPromptComponent {

}
