import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";

import { MaterialModule } from "./material/material.module";
import { SvgAssetsModule } from "./svg-assets/svg-assets.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { StationListComponent } from "./station-list/station-list.component";
import { BusListComponent } from "./bus-list/bus-list.component";
import { BusEditComponent } from "./bus-list/bus-edit/bus-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StationListComponent,
    BusListComponent,
    BusEditComponent
  ],
  entryComponents: [BusEditComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    SvgAssetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
