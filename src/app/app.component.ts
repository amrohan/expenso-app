import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'expenso';
  private auth = inject(AuthService);
  private route = inject(Router);

  ngOnInit(): void {
    if (this.auth.IsAuthenticated()) {
      this.route.navigate(['/home']);
      return;
    }
    this.route.navigate(['/login']);
  }
}
