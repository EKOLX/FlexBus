import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { BusViewModel } from "../viewModels/busView.model";

@Injectable({
  providedIn: "root"
})
export class BusService {
  private jsonServerApi = "http://localhost:3000";
  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) {}

  getBuses(): Observable<BusViewModel[]> {
    return this.http.get<BusViewModel[]>(
      `${this.jsonServerApi}/buses`,
      this.httpOptions
    );
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
