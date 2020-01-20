import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { httpConfigs } from "../db/local.db";
import { Station, StationSlot } from "../models/station.model";

@Injectable({
  providedIn: "root"
})
export class StationService {
  constructor(private http: HttpClient) {}

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(
      `${httpConfigs.serverApi}/stations`,
      httpConfigs.options
    );
  }

  getStationById(id: number): Observable<Station> {
    return this.http.get<Station>(
      `${httpConfigs.serverApi}/stations/${id}`,
      httpConfigs.options
    );
  }

  getStationSlots(): Observable<StationSlot[]> {
    return this.http.get<StationSlot[]>(
      `${httpConfigs.serverApi}/stationSlots`,
      httpConfigs.options
    );
  }

  getStationSlotById(id: number): Observable<StationSlot> {
    return this.http.get<StationSlot>(
      `${httpConfigs.serverApi}/stationSlots/${id}`,
      httpConfigs.options
    );
  }

  saveStation(station: Station): Observable<Station> {
    if (station.id === 0) {
      console.info("Adding new station");
      return this.http.post<Station>(
        `${httpConfigs.serverApi}/stations`,
        station,
        httpConfigs.options
      );
    }

    console.info("Updating existing station");
    return this.http.put<Station>(
      `${httpConfigs.serverApi}/stations/${station.id}`,
      station,
      httpConfigs.options
    );
  }

  saveStationSlot(slot: StationSlot): Observable<StationSlot> {
    if (slot.id === 0) {
      console.info("Adding new slot");
      return this.http.post<StationSlot>(
        `${httpConfigs.serverApi}/stationSlots`,
        slot,
        httpConfigs.options
      );
    }

    console.info("Updating existing slot");
    return this.http.put<StationSlot>(
      `${httpConfigs.serverApi}/stationSlots/${slot.id}`,
      slot,
      httpConfigs.options
    );
  }

  deleteStation(id: number): Observable<void> {
    return this.http.delete<void>(
      `${httpConfigs.serverApi}/stations/${id}`,
      httpConfigs.options
    );
  }
}
