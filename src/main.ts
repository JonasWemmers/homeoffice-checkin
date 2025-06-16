import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { environment } from './environments/environment';

// 👉 Firebase Setup in AppConfig integrieren
bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    ...(appConfig.providers || [])
  ]
}).catch((err: unknown) => console.error(err));
