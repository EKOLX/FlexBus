import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { BusService } from "./bus.service";
import { Bus } from "../models/bus.model";
import { httpConfigs } from "../db/local.db";

describe("BusService", () => {
  let service: BusService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BusService]
    });

    service = TestBed.get(BusService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("#getBuses() should return an Observable<Bus[]>", (done: DoneFn) => {
    const buses: Bus[] = [
      { id: 1, busType: 1, plateNumber: "BUS-AZE-001" },
      { id: 2, busType: 2, plateNumber: "BUS-AZE-002" }
    ];

    service.getBuses().subscribe(result => {
      expect(result.length).toEqual(2);
      expect(result).toEqual(buses);
    });

    const api = httpMock.expectOne(`${httpConfigs.serverApi}/buses`);

    expect(api.request.method).toBe("GET");
    api.flush(buses);
    httpMock.verify();

    done();
  });
});
