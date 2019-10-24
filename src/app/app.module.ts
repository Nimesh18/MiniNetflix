import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MiniNetflixModule } from './mini-netflix/mini-netflix.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MiniNetflixModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
