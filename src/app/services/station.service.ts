import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Station, StationSlot } from "../models/station.model";

@Injectable({
  providedIn: "root"
})
export class StationService {
  private jsonServerApi = "http://localhost:3000";
  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) {}

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(
      `${this.jsonServerApi}/stations`,
      this.httpOptions
    );
  }

  getStationById(id: number): Observable<Station> {
    return this.http.get<Station>(
      `${this.jsonServerApi}/stations/${id}`,
      this.httpOptions
    );
  }

  getStationSlots(): Observable<StationSlot[]> {
    return this.http.get<StationSlot[]>(
      `${this.jsonServerApi}/stationSlots`,
      this.httpOptions
    );
  }
}
