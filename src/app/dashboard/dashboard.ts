import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  activeButton: 'checkin' | 'checkout' | null = null;

  showOverview = false; 
  timesForDate: string[] = [
    '09:00 - Einstempeln',
    '12:00 - Pause',
    '17:00 - Ausstempeln',
  ]; 

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

  toggleOverview() {
    this.showOverview = !this.showOverview;
  }
}
