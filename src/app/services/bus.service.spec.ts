import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { BusService } from "./bus.service";

describe("BusService", () => {
  let service: BusService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BusService]
    })
  );

  beforeEach(() => {
    service = TestBed.get(BusService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  xit("#getBuses() should return an Observable<Bus[]>", (done: DoneFn) => {
    service.getBuses().subscribe(value => {
      //expect(value).toBe("");
      done();
    });
  });
});
