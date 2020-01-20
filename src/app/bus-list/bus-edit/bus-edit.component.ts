import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalType, BusType } from "src/app/models/enums.model";
import { Bus } from "src/app/models/bus.model";
import { Station, StationSlot } from "src/app/models/station.model";
import { BusModalViewModel } from "src/app/viewModels/busView.model";
import { busTypes } from "src/app/db/local.db";
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
      Validators.required
    ]);
    this.stationId = new FormControl(
      this.viewModel.stationId,
      Validators.required
    );
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
            this.slotNumber.value,
            formValues.stationId,
            bus.id
          );

          this.stationService.saveStationSlot(stationSlot).subscribe(() => {
            this.isBusy = false;
            this.dialogRef.close(true);
          });
        });
      }
    });
  }

  registerOnChanges(): void {
    this.stationId.valueChanges.subscribe(selected => {
      // get the number of slots of the current station and the smallest available slot number
      this.commonService
        .getStationWithSlots(selected)
        .subscribe((result: [Station, StationSlot[]]) => {
          const slotCount = result[0].slotsNumber;
          const occupied = result[1].filter(sl => sl.stationId === selected)
            .length;

          if (occupied < slotCount) {
            this.slotNumber.setValue(`${occupied + 1}`);
          } else {
            this.stationId.setErrors({ required: true });
          }
        });
    });
  }
}
