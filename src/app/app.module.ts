import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";

import { MaterialModule } from "./material/material.module";
import { SvgAssetsModule } from "./svg-assets/svg-assets.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { BusListComponent } from "./bus-list/bus-list.component";
import { BusEditComponent } from "./bus-list/bus-edit/bus-edit.component";
import { StationListComponent } from "./station-list/station-list.component";
import { StationEditComponent } from "./station-list/station-edit/station-edit.component";
import { ConfirmationComponent } from "./shared/confirmation/confirmation.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BusListComponent,
    BusEditComponent,
    StationListComponent,
    StationEditComponent,
    ConfirmationComponent
  ],
  entryComponents: [
    BusEditComponent,
    StationEditComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    SvgAssetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
