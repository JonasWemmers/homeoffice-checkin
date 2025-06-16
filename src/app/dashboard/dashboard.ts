import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  activeButton: 'checkin' | 'checkout' | null = null;

  constructor(private authService: AuthService) {}

  async checkIn() {
    try {
      await this.authService.stampTime('in');
      this.activeButton = 'checkin';
      alert('Eingestempelt! 🔥');
    } catch (error) {
      alert('Fehler beim Einstempeln');
    }
  }

  async checkOut() {
    try {
      await this.authService.stampTime('out');
      this.activeButton = 'checkout';
      alert('Ausgestempelt! 💨');
    } catch (error) {
      alert('Fehler beim Ausstempeln');
    }
  }
}
