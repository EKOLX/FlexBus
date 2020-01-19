import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalType, BusType } from "src/app/models/enums.model";
import { Bus } from "src/app/models/bus.model";
import { Station, StationSlot } from "src/app/models/station.model";
import { BusModalViewModel } from "src/app/viewModels/busView.model";
import { busTypes } from "src/app/services/local.db";
import { BusService } from "src/app/services/bus.service";
import { StationService } from "src/app/services/station.service";

@Component({
  selector: "app-bus-edit",
  templateUrl: "./bus-edit.component.html",
  styleUrls: ["./bus-edit.component.scss"]
})
export class BusEditComponent implements OnInit {
  title: string;
  busTypes = busTypes;
  stations: Array<Station> = [];
  stationSlots: Array<StationSlot> = [];
  isBusy: boolean = false;

  // Form controls
  plateNumber = new FormControl("", [Validators.required]);
  stationId = new FormControl(null, Validators.required);
  slotId = new FormControl(
    { value: null, disabled: true },
    Validators.required
  );

  busForm = new FormGroup({
    plateNumber: this.plateNumber,
    busType: new FormControl(BusType.Regular, Validators.required),
    stationId: this.stationId,
    slotId: this.slotId
  });

  constructor(
    public dialogRef: MatDialogRef<BusEditComponent>,
    @Inject(MAT_DIALOG_DATA) public viewModel: BusModalViewModel,
    private stationService: StationService,
    private busService: BusService
  ) {}

  ngOnInit() {
    this.title =
      this.viewModel.modalType === ModalType.New
        ? "Add a new bus"
        : "Update the bus";

    this.stationService.getStations().subscribe((data: Array<Station>) => {
      this.stations = data;
    });
    this.registerOnChanges();
  }

  onSubmit(): void {
    const formValues = this.busForm.value;

    // TODO: Refactor callbacks hell
    this.busService.getBuses().subscribe((data: Array<Bus>) => {
      if (data.find(b => b.plateNumber === formValues.plateNumber)) {
        this.plateNumber.setErrors({ isExist: true });
      } else {
        this.isBusy = true;
        const newBus = new Bus(0, formValues.plateNumber, formValues.busType);

        this.busService.saveBus(newBus).subscribe((bus: Bus) => {
          const stationSlot = new StationSlot(
            formValues.slotId,
            formValues.stationId,
            bus.id
          );

          this.stationService
            .saveStationSlot(stationSlot)
            .subscribe((stationSlot: StationSlot) => {
              this.isBusy = false;
              this.dialogRef.close(true);
            });
        });
      }
    });
  }

  registerOnChanges(): void {
    this.stationId.valueChanges.subscribe(selected => {
      this.stationService
        .getStationSlots()
        .subscribe((data: Array<StationSlot>) => {
          this.stationSlots = data.filter(
            sl => sl.stationId === selected && sl.busId == null
          );

          if (this.stationSlots.length == 0) {
            this.slotId.disable();
            // keep setErrors() after disable() since last one excludes control from validation
            this.stationId.setErrors({ required: true });
          } else {
            this.slotId.enable();
          }
        });
    });
  }
}
