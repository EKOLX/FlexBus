import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

import { LinkedinSvg } from "./svg-assets/in-logo.svg";
import { BusSvg } from "./svg-assets/bus.svg";
import { ArrowSvg } from "./svg-assets/arrow.svg";
import { HomeComponent } from './home/home.component';
import { StationListComponent } from './station-list/station-list.component';
import { BusListComponent } from './bus-list/bus-list.component';

@NgModule({
  declarations: [AppComponent, LinkedinSvg, BusSvg, ArrowSvg, HomeComponent, StationListComponent, BusListComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
