import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ModalType } from "src/app/models/enums.model";
import { Station, StationSlot } from "src/app/models/station.model";
import { BusModalViewModel } from "src/app/viewModels/busView.model";
import { busTypes } from "src/app/services/local.db";
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
  selectedStationId: number;

  constructor(
    public dialogRef: MatDialogRef<BusEditComponent>,
    @Inject(MAT_DIALOG_DATA) public viewModel: BusModalViewModel,
    private stationService: StationService
  ) {}

  ngOnInit() {
    this.title =
      this.viewModel.modalType === ModalType.New
        ? "Add a new bus"
        : "Update the bus";

    this.stationService.getStations().subscribe((data: Array<Station>) => {
      this.stations = data;
    });
  }

  onStationChange(event): void {
    this.selectedStationId = event.value;

    this.stationService
      .getStationSlots()
      .subscribe((data: Array<StationSlot>) => {
        this.stationSlots = data.filter(
          sl => sl.stationId === this.selectedStationId && sl.busId == null
        );
      });
  }

  onSave(event: MouseEvent): void {
    event.preventDefault();
    this.isBusy = true;
    // TODO: save data
    setTimeout(() => this.dialogRef.close(true), 3000);
  }
}
