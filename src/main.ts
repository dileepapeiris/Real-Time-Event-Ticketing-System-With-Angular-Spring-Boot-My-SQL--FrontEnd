import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Merge the providers from both configurations
const combinedConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // Ensure existing providers from appConfig are preserved
    provideHttpClient(),
  ],
};

bootstrapApplication(AppComponent, combinedConfig).catch((err) =>
  console.error(err)
);
