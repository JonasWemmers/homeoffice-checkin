import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth();
  private db = getFirestore();
  public currentUser: User | null = null;

  constructor() {
    // User is monitored and always kept up to date
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
    });
  }

  getUid(): string | null {
    return this.currentUser ? this.currentUser.uid : null;
  }

  async stampTime(type: 'in' | 'out'): Promise<void> {
    const uid = this.getUid();
    if (!uid) throw new Error('Kein User eingeloggt');

    const timestampsRef = collection(this.db, 'users', uid, 'timestamps');
    await addDoc(timestampsRef, {
      type,
      timestamp: new Date(),
    });
  }
}
