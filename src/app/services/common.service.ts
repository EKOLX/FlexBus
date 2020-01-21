import { Injectable } from "@angular/core";
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
    private busService: BusService,
    private stationService: StationService
  ) {}

  getBusesStationsSlots(): Observable<[Bus[], Station[], StationSlot[]]> {
    const buses = this.busService.getBuses();
    const stations = this.stationService.getStations();
    const stationSlots = this.stationService.getStationSlots();

    return forkJoin(buses, stations, stationSlots);
  }

  getStationWithSlots(stationId: number): Observable<[Station, StationSlot[]]> {
    const station = this.stationService.getStationById(stationId);
    const stationSlots = this.stationService.getStationSlots();

    return forkJoin(station, stationSlots);
  }

  generateSlots(stationId: number, slotCount: number): Observable<any> {
    const stationSlots = [];
    for (let slot = 1; slot <= slotCount; slot++) {
      const stationSlot = this.stationService.saveStationSlot(
        new StationSlot(0, slot, stationId, null)
      );
      stationSlots.push(stationSlot);
    }

    console.info("Starting generating new slots");
    return forkJoin(stationSlots);
  }

  removeBusAndSlot(busId: number, slotId: number): Observable<[{}, {}]> {
    const bus = this.busService.removeBus(busId);
    const slot = this.stationService.removeStationSlot(slotId);

    return forkJoin(bus, slot);
  }
}
