import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalType, BusType } from "src/app/models/enums.model";
import { Bus } from "src/app/models/bus.model";
import { Station, StationSlot } from "src/app/models/station.model";
import { BusModalViewModel } from "src/app/viewModels/busView.model";
import { busTypes } from "src/app/db/local.db";
import { slotNumberValidator } from "src/app/shared/custom-validators/custom.validators";
import { BusService } from "src/app/services/bus.service";
import { StationService } from "src/app/services/station.service";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-bus-edit",
  templateUrl: "./bus-edit.component.html",
  styleUrls: ["./bus-edit.component.scss"]
})
export class BusEditComponent implements OnInit {
  title: string;
  busTypes = busTypes;
  stations: Array<Station> = [];
  isBusy: boolean = false;

  plateNumber: FormControl;
  stationId: FormControl;
  slotId: FormControl;
  slotNumber: FormControl;
  busForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BusEditComponent>,
    @Inject(MAT_DIALOG_DATA) public viewModel: BusModalViewModel,
    private stationService: StationService,
    private busService: BusService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.title =
      this.viewModel.modalType === ModalType.New
        ? "Add a new bus"
        : "Update the bus";

    // Form controls
    this.plateNumber = new FormControl(this.viewModel.bus.plateNumber, [
      Validators.required,
      slotNumberValidator()
    ]);
    this.stationId = new FormControl(this.viewModel.stationId);
    this.slotId = new FormControl({
      value: this.viewModel.slotId,
      disabled: true
    });
    this.slotNumber = new FormControl({
      value: this.viewModel.slotNumber,
      disabled: true
    });
    this.busForm = new FormGroup({
      plateNumber: this.plateNumber,
      busType: new FormControl(BusType.Regular, Validators.required),
      stationId: this.stationId,
      slotNumber: this.slotNumber
    });

    this.registerOnChanges();

    this.stationService.getStations().subscribe((data: Array<Station>) => {
      this.stations = data;
    });
  }

  onSubmit(): void {
    if (this.viewModel.bus.id == 0) {
      this.addNewBus();
    } else {
      this.updateBus();
    }
  }

  registerOnChanges(): void {
    this.stationId.valueChanges.subscribe(selected => {
      if (selected == null || selected === undefined) {
        this.slotNumber.setValue("");
        return;
      }

      // get the number of slots of the current station and the smallest available slot number
      this.commonService
        .getStationWithSlots(selected)
        .subscribe((result: [Station, StationSlot[]]) => {
          const station = result[0];
          const slots = result[1].filter(sl => sl.stationId === selected);

          if (slots.length < station.slotsNumber) {
            this.slotNumber.setValue(`${slots.length + 1}`);
          } else {
            this.stationId.setErrors({ required: true });
          }
        });
    });
  }

  private addNewBus(): void {
    const formValues = this.busForm.getRawValue();

    // TODO: Refactor callbacks hell
    // Check if bus with the plateNumber is already exist
    this.busService.getBuses().subscribe((data: Array<Bus>) => {
      if (data.find(b => b.plateNumber === formValues.plateNumber)) {
        this.plateNumber.setErrors({ isExist: true });
      } else {
        this.isBusy = true;
        const newBus = new Bus(0, formValues.plateNumber, formValues.busType);

        this.busService.saveBus(newBus).subscribe(
          (bus: Bus) => {
            if (formValues.stationId) {
              const stationSlot = new StationSlot(
                0,
                +formValues.slotNumber,
                formValues.stationId,
                bus.id
              );

              this.stationService.saveStationSlot(stationSlot).subscribe(() => {
                this.isBusy = false;
                this.dialogRef.close({ done: true });
              });
            }

            this.isBusy = false;
            this.dialogRef.close({ done: true });
          },
          error => console.log(error)
        );
      }
    });
  }

  private updateBus() {
    this.commonService
      .removeBusAndSlot(this.viewModel.bus.id, this.viewModel.slotId)
      .subscribe(
        () => {
          this.addNewBus();
        },
        error => {
          // NOTE: json-server throws error in spite of deletes the row
          // so anyway continue adding
          console.log(error);
          this.addNewBus();
        }
      );
  }
}
