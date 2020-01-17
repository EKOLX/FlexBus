import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatTableDataSource,
  MatSort,
  MatTable
} from "@angular/material";
import { MatPaginator } from "@angular/material/paginator";
import { SelectionModel } from "@angular/cdk/collections";
import { ModalType } from "../models/enums.model";
import { BusModalModel, BusDetailModel } from "../viewModels/busView.model";
import { BusEditComponent } from "./bus-edit/bus-edit.component";

const dataSource = new Array(
  {
    plateNumber: "BUS-AZE-CZ1",
    busType: 1,
    stationAndSlot: "Station 1 @ Slot 1"
  },
  {
    plateNumber: "BUS-AZE-CZ2",
    busType: 1,
    stationAndSlot: "Station 1 @ Slot 2"
  },
  {
    plateNumber: "BUS-AZE-CZ3",
    busType: 1,
    stationAndSlot: "Station 1 @ Slot 4"
  },
  {
    plateNumber: "BUS-AZE-CZ4",
    busType: 1,
    stationAndSlot: "Station 1 @ Slot 6"
  },
  {
    plateNumber: "BUS-AZE-CZ5",
    busType: 1,
    stationAndSlot: "Station 1 @ Slot 7"
  },
  {
    plateNumber: "BUS-AZE-CZ6",
    busType: 1,
    stationAndSlot: "Station 1 @ Slot 12"
  },
  {
    plateNumber: "BUS-AZE-CZ7",
    busType: 1,
    stationAndSlot: "Station 1 @ Slot 17"
  },
  {
    plateNumber: "BUS-AZE-CZ8",
    busType: 1,
    stationAndSlot: "Station 2 @ Slot 2"
  },
  {
    plateNumber: "BUS-AZE-CZ9",
    busType: 1,
    stationAndSlot: "Station 2 @ Slot 6"
  },
  {
    plateNumber: "BUS-AZE-010",
    busType: 1,
    stationAndSlot: "Station 3 @ Slot 1"
  },
  {
    plateNumber: "BUS-AZE-011",
    busType: 1,
    stationAndSlot: "Station 3 @ Slot 12"
  }
);

@Component({
  selector: "app-bus-list",
  templateUrl: "./bus-list.component.html",
  styleUrls: ["./bus-list.component.scss"]
})
export class BusListComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<BusDetailModel>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  busList: MatTableDataSource<BusDetailModel>;
  displayedColumns: string[];
  selection = new SelectionModel<BusDetailModel>(false, []);

  constructor(public dialog: MatDialog) {
    this.displayedColumns = [
      "select",
      "plateNumber",
      "busType",
      "stationAndSlot"
    ];
    this.busList = new MatTableDataSource<BusDetailModel>(dataSource);
  }

  ngOnInit() {
    this.busList.paginator = this.paginator;
    this.busList.sort = this.sort;
  }

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
    const selected = this.selection.selected[0];
    if (selected) {
      const index = dataSource.findIndex(
        b => b.plateNumber === selected.plateNumber
      );
      dataSource.splice(index, 1);

      this.busList.data = dataSource;
      this.table.renderRows();
      this.selection.clear();
    }
  }

  applyFilter(filterValue: string): void {
    this.busList.filter = filterValue.trim().toLowerCase();
  }

  checkboxLabel(row: BusDetailModel): string {
    if (row) {
      return `${this.selection.isSelected(row) ? "deselect" : "select"} row`;
    }
  }
}
