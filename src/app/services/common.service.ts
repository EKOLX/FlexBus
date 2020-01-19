import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { Bus } from "../models/bus.model";
import { Station, StationSlot } from "../models/station.model";
import { BusService } from "./bus.service";
import { StationService } from "./station.service";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  constructor(
    private http: HttpClient,
    private busService: BusService,
    private stationService: StationService
  ) {}

  getBusesStationSlots(): Observable<[Bus[], Station[], StationSlot[]]> {
    const buses = this.busService.getBuses();
    const stations = this.stationService.getStations();
    const stationSlots = this.stationService.getStationSlots();

    return forkJoin(buses, stations, stationSlots);
  }

  saveBuseStationSlot(
    bus: Bus,
    station: Station,
    slot: StationSlot
  ): Observable<[Bus, Station, StationSlot]> {
    const buses = this.busService.saveBus(bus);
    const stations = this.stationService.saveStation(station);
    const stationSlots = this.stationService.saveStationSlot(slot);

    return forkJoin(buses, stations, stationSlots);
  }
}
