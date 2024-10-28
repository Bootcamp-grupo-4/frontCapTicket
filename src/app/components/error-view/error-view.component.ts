import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-view',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './error-view.component.html',
  styleUrl: './error-view.component.scss'
})
export class ErrorViewComponent {
  constructor(
    private router: Router,
  ) {}
  
  goBack() {
    this.router.navigate(['/list']);
  }
}
