import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MaterialModule } from "src/app/material/material.module";
import { StationEditComponent } from "./station-edit.component";
import { StationModalViewModel } from "src/app/viewModels/stationView.model";
import { ModalType } from "src/app/models/enums.model";
import { Station } from "src/app/models/station.model";

describe("StationEditComponent", () => {
  let component: StationEditComponent;
  let fixture: ComponentFixture<StationEditComponent>;
  let viewModel: StationModalViewModel;

  beforeEach(async(() => {
    viewModel = new StationModalViewModel(ModalType.New);
    viewModel.station = new Station(1, "test1", 2);

    TestBed.configureTestingModule({
      declarations: [StationEditComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: viewModel }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("#title value should be 'Update the station' if ModalType.Edit", (done: DoneFn) => {
    viewModel = new StationModalViewModel(ModalType.Edit);
    viewModel.station = new Station(1, "test1", 12);
    component.viewModel = viewModel;
    component.ngOnInit();

    expect(component.title).toBe("Update the station");

    done();
  });
});
