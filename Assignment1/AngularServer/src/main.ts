//Imports
import {AppModule}              from './app/app.module';
import {environment}            from './environments/environment';
import {enableProdMode}         from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

//Enable Production
if (environment.production) {
  enableProdMode();
}

//Bootstrap Default
platformBrowserDynamic().bootstrapModule(AppModule);
