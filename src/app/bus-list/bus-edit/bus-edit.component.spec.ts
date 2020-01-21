import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BusEditComponent } from "./bus-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MaterialModule } from "src/app/material/material.module";
import { ModalType } from "src/app/models/enums.model";
import { Bus } from "src/app/models/bus.model";
import { BusModalViewModel } from "src/app/viewModels/busView.model";

describe("BusEditComponent", () => {
  let component: BusEditComponent;
  let fixture: ComponentFixture<BusEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusEditComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: []
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusEditComponent);
    component = fixture.componentInstance;

    const viewModel = new BusModalViewModel(ModalType.New);
    viewModel.bus = new Bus(1, "BUS-AZE-001", 1);
    component.viewModel = viewModel;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
