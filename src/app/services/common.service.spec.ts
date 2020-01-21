import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { CommonService } from "./common.service";
import { Bus } from "../models/bus.model";
import { Station, StationSlot } from "../models/station.model";
import { httpConfigs } from "../db/local.db";

describe("CommonService", () => {
  let service: CommonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.get(CommonService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("#getBusesStationsSlots() should return Observable<[Bus[], Station[], StationSlot[]]>", (done: DoneFn) => {
    const buses: Bus[] = [
      { id: 1, busType: 1, plateNumber: "BUS-AZE-001" },
      { id: 2, busType: 2, plateNumber: "BUS-AZE-002" }
    ];
    const stations: Station[] = [
      { id: 1, name: "test1", slotsNumber: 12 },
      { id: 2, name: "test2", slotsNumber: 21 }
    ];
    const slots: StationSlot[] = [
      { id: 1, stationId: 1, slotNumber: 12 },
      { id: 2, stationId: 2, slotNumber: 32 }
    ];

    service.getBusesStationsSlots().subscribe(result => {
      expect(result).toEqual([buses, stations, slots]);
    });

    const apiBuses = httpMock.expectOne(`${httpConfigs.serverApi}/buses`);
    expect(apiBuses.request.method).toBe("GET");
    apiBuses.flush(buses);

    const apiStations = httpMock.expectOne(`${httpConfigs.serverApi}/stations`);
    expect(apiStations.request.method).toBe("GET");
    apiStations.flush(stations);

    const apiStationSlot = httpMock.expectOne(
      `${httpConfigs.serverApi}/stationSlots`
    );
    expect(apiStationSlot.request.method).toBe("GET");
    apiStationSlot.flush(slots);

    httpMock.verify();

    done();
  });
});
