import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { tap, map, mergeMap } from "rxjs/operators";
import { Bus } from "../models/bus.model";
import { BusViewModel } from "../viewModels/busView.model";
import { StationService } from "./station.service";

@Injectable({
  providedIn: "root"
})
export class BusService {
  private jsonServerApi = "http://localhost:3000";
  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient,
    private stationService: StationService
  ) {}

  getBuses(): Observable<any> {
    const buses = this.http.get<Bus[]>(
      `${this.jsonServerApi}/buses`,
      this.httpOptions
    );
    const stations = this.stationService.getStations();
    const stationSlots = this.stationService.getStationSlots();
    return forkJoin(buses, stations, stationSlots);
  }

  saveBus(bus: BusViewModel): Observable<BusViewModel> {
    return this.http.post<BusViewModel>(
      `${this.jsonServerApi}/buses`,
      bus,
      this.httpOptions
    );
  }

  removeBus(id: number): Observable<{}> {
    return this.http.delete(
      `${this.jsonServerApi}/buses/${id}`,
      this.httpOptions
    );
  }
}
