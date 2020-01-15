import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { StationListComponent } from "./station-list/station-list.component";
import { BusListComponent } from "./bus-list/bus-list.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "stations", component: StationListComponent },
  { path: "buses", component: BusListComponent },
  { path: "**", redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
