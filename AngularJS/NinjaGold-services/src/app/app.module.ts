import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CountComponent } from './count/count.component';
import { BuildingComponent } from './building/building.component';
import { EventsComponent } from './events/events.component';

import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    CountComponent,
    BuildingComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
