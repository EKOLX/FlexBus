import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

import { LinkedinSvg } from "./svg-assets/in-logo.svg";
import { BusSvg } from "./svg-assets/bus.svg";
import { ArrowSvg } from "./svg-assets/arrow.svg";

@NgModule({
  declarations: [AppComponent, LinkedinSvg, BusSvg, ArrowSvg],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
