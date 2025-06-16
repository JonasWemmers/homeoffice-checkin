import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { environment } from './environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';

// AuthService importieren
import { AuthService } from './app/services/auth';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideAnimations(),
    ...(appConfig.providers || []),
  ],
}).catch((err: unknown) => console.error(err));
