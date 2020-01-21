import { TestBed } from "@angular/core/testing";
import { StationService } from "./station.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { Station } from "../models/station.model";
import { httpConfigs } from "../db/local.db";

describe("StationService", () => {
  let service: StationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });

    service = TestBed.get(StationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("#getStationById should return Observable<Station>", (done: DoneFn) => {
    const stations: Station[] = [
      { id: 1, name: "test1", slotsNumber: 12 },
      { id: 2, name: "test2", slotsNumber: 21 }
    ];
    const firstId: number = stations[0].id;

    service.getStationById(firstId).subscribe(result => {
      expect(result.id).toBe(firstId);
    });

    let apiStations = httpMock.expectOne(
      `${httpConfigs.serverApi}/stations/${firstId}`
    );
    expect(apiStations.request.method).toBe("GET");
    httpMock.verify();

    done();
  });

  it("#saveStation by passing new Station with Id = 0 should POST and return Observable<Station>", (done: DoneFn) => {
    const station: Station = { id: 0, name: "test3", slotsNumber: 31 };

    service.saveStation(station).subscribe(result => {
      expect(result).toEqual(station);
    });

    const apiStationsPost = httpMock.expectOne(
      `${httpConfigs.serverApi}/stations`
    );
    expect(apiStationsPost.request.method).toBe("POST");
    httpMock.verify();

    done();
  });

  it("#saveStation by passing new Station with Id != 0 should PUT and return Observable<Station>", (done: DoneFn) => {
    const station: Station = { id: 4, name: "test4", slotsNumber: 11 };

    service.saveStation(station).subscribe(result => {
      expect(result).toEqual(station);
    });

    const apiStationsPut = httpMock.expectOne(
      `${httpConfigs.serverApi}/stations/${station.id}`
    );
    expect(apiStationsPut.request.method).toBe("PUT");
    httpMock.verify();

    done();
  });

  it("#deleteStation should be executed successfully", (done: DoneFn) => {
    const station: Station = { id: 4, name: "test4", slotsNumber: 11 };

    service.deleteStation(station.id).subscribe(() => {});

    const apiStationDelete = httpMock.expectOne(
      `${httpConfigs.serverApi}/stations/${station.id}`
    );
    expect(apiStationDelete.request.method).toBe("DELETE");
    httpMock.verify();

    done();
  });
});
