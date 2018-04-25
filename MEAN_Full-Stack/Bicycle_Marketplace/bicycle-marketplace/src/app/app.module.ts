import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { BikeMarketService } from './bike-market.service';
import { CookieService } from 'ngx-cookie-service';
import { CookieModule } from 'ngx-cookie';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component';
import { ListAllComponent } from './browse/list-all/list-all.component';
import { ListMyComponent } from './browse/list-my/list-my.component';
import { SearchPipe } from './filter.pipe';

@NgModule({ 
  declarations: [
    AppComponent,
    HomeComponent,
    BrowseComponent,
    ListAllComponent,
    ListMyComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    CookieModule.forRoot()
  ],
  providers: [BikeMarketService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
