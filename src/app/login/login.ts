import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  private auth: Auth = inject(Auth);
  private router = inject(Router);

  async login() {
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.errorMessage = '';
      alert('✅ Es hat funktioniert!');
    } catch (error: any) {
      this.errorMessage = this.mapError(error.code);
    }
  }
  

  private mapError(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'Nutzer existiert nicht.';
      case 'auth/wrong-password':
        return 'Falsches Passwort.';
      case 'auth/invalid-email':
        return 'Ungültige E-Mail.';
      default:
        return 'Unbekannter Fehler: ' + code;
    }
  }
}
