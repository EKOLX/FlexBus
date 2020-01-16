import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ModalType } from "../models/enums.model";
import { BusModalModel, BusDetailModel } from "../viewModels/busView.model";
import { BusEditComponent } from "./bus-edit/bus-edit.component";

@Component({
  selector: "app-bus-list",
  templateUrl: "./bus-list.component.html",
  styleUrls: ["./bus-list.component.scss"]
})
export class BusListComponent implements OnInit {
  busList: Array<BusDetailModel>;
  displayedColumns: string[];

  constructor(public dialog: MatDialog) {
    this.busList = new Array(
      {
        plateNumber: "BUS-AZE-CZ1",
        busType: 1,
        stationAndSlot: "Station 1 @ Slot 12"
      },
      {
        plateNumber: "BUS-AZE-CZ2",
        busType: 1,
        stationAndSlot: "Station 1 @ Slot 12"
      },
      {
        plateNumber: "BUS-AZE-CZ3",
        busType: 1,
        stationAndSlot: "Station 1 @ Slot 12"
      },
      {
        plateNumber: "BUS-AZE-CZ4",
        busType: 1,
        stationAndSlot: "Station 1 @ Slot 12"
      },
      {
        plateNumber: "BUS-AZE-CZ5",
        busType: 1,
        stationAndSlot: "Station 1 @ Slot 12"
      },
      {
        plateNumber: "BUS-AZE-CZ6",
        busType: 1,
        stationAndSlot: "Station 1 @ Slot 12"
      },
      {
        plateNumber: "BUS-AZE-CZ7",
        busType: 1,
        stationAndSlot: "Station 1 @ Slot 12"
      },
      {
        plateNumber: "BUS-AZE-CZ8",
        busType: 1,
        stationAndSlot: "Station 1 @ Slot 12"
      },
      {
        plateNumber: "BUS-AZE-CZ9",
        busType: 1,
        stationAndSlot: "Station 1 @ Slot 12"
      },
      {
        plateNumber: "BUS-AZE-010",
        busType: 1,
        stationAndSlot: "Station 1 @ Slot 12"
      },
      {
        plateNumber: "BUS-AZE-011",
        busType: 1,
        stationAndSlot: "Station 1 @ Slot 12"
      }
    );
    this.displayedColumns = ["plateNumber", "busType", "stationAndSlot"];
  }

  ngOnInit() {}

  onAdd(): void {
    const dialogRef = this.dialog.open(BusEditComponent, {
      // TODO: make width responsive
      width: "500px",
      data: new BusModalModel(ModalType.New)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) console.log(result);
    });
  }

  onEdit(): void {
    this.dialog.open(BusEditComponent, {
      // TODO: make width responsive
      width: "500px",
      data: new BusModalModel(ModalType.Edit)
    });
  }

  Delete(): void {
    // TODO: will be implemented
  }
}
