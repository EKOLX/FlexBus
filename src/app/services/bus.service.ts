import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, map, mergeMap } from "rxjs/operators";
import { httpConfigs } from "./local.db";
import { Bus } from "../models/bus.model";
import { StationService } from "./station.service";

@Injectable({
  providedIn: "root"
})
export class BusService {
  constructor(
    private http: HttpClient,
    private stationService: StationService
  ) {}

  getBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(
      `${httpConfigs.serverApi}/buses`,
      httpConfigs.options
    );
  }

  saveBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(
      `${httpConfigs.serverApi}/buses`,
      bus,
      httpConfigs.options
    );
  }

  removeBus(id: number): Observable<{}> {
    return this.http.delete(
      `${httpConfigs.serverApi}/buses/${id}`,
      httpConfigs.options
    );
  }
}
