import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material Datepicker Module
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  activeButton: 'checkin' | 'checkout' | null = null;

  showOverview = false; // Übersicht ein/aus
  selectedDate: Date | null = null;
  timesForDate: string[] = []; // Die Stempelzeiten, die unter dem Kalender angezeigt werden

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
    if (!this.showOverview) {
      this.selectedDate = null;
      this.timesForDate = [];
    }
  }

  async onDateChange(date: Date) {
    this.selectedDate = date;
    // Hier solltest du die Zeiten aus deinem Backend laden, z.B.:
    // this.timesForDate = await this.authService.getTimesByDate(date);

    // Dummy-Daten zum Testen:
    this.timesForDate = [
      '09:00 - Einstempeln',
      '12:00 - Pause',
      '17:00 - Ausstempeln',
    ];
  }
}
