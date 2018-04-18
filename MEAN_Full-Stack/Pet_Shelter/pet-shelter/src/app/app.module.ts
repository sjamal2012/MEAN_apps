import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { CookieModule } from 'ngx-cookie';

import { PetService } from './pet.service';
import { OrderByPipe } from './orderby.pipe';
import { AppComponent } from './app.component';
import { ShelterComponent } from './shelter/shelter.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    AppComponent,
    ShelterComponent,
    AddComponent,
    EditComponent,
    OrderByPipe,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    CookieModule.forRoot()
  ],
  providers: [PetService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
