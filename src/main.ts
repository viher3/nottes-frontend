import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppConfig } from './app/app.config';

if (environment.production) {
  enableProdMode();
}

AppConfig.load().then(() => {
    platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));
});
