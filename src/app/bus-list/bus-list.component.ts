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
import { BusModalViewModel, BusViewModel } from "../viewModels/busView.model";
import { BusEditComponent } from "./bus-edit/bus-edit.component";
import { BusService } from "../services/bus.service";

@Component({
  selector: "app-bus-list",
  templateUrl: "./bus-list.component.html",
  styleUrls: ["./bus-list.component.scss"]
})
export class BusListComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<BusViewModel>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  busList: MatTableDataSource<BusViewModel> = new MatTableDataSource<
    BusViewModel
  >();
  displayedColumns: string[];
  selection = new SelectionModel<BusViewModel>(false, []);

  constructor(public dialog: MatDialog, private busService: BusService) {
    this.displayedColumns = [
      "select",
      "plateNumber",
      "busType",
      "stationAndSlot"
    ];
  }

  ngOnInit() {
    this.busService.getBuses().subscribe(
      (data: BusViewModel[]) => {
        this.busList = new MatTableDataSource<BusViewModel>(data);
        this.busList.paginator = this.paginator;
        this.busList.sort = this.sort;
      },
      error => console.log(error)
    );
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(BusEditComponent, {
      // TODO: make width responsive
      width: "500px",
      data: new BusModalViewModel(ModalType.New)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.reloadDataSource();
    });
  }

  onEdit(): void {
    const dialogRef = this.dialog.open(BusEditComponent, {
      // TODO: make width responsive
      width: "500px",
      data: new BusModalViewModel(ModalType.Edit)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.reloadDataSource();
    });
  }

  Delete(): void {
    const selected = this.selection.selected[0];
    if (selected) {
      // TODO: Refactor callbacks hell
      this.busService.removeBus(selected.id).subscribe(
        () => this.reloadDataSource(),
        error => console.log(error)
      );
    }
  }

  applyFilter(filterValue: string): void {
    this.busList.filter = filterValue.trim().toLowerCase();
  }

  checkboxLabel(row: BusViewModel): string {
    if (row) {
      return `${this.selection.isSelected(row) ? "deselect" : "select"} row`;
    }
  }

  private reloadDataSource(): void {
    this.busService.getBuses().subscribe(
      (data: BusViewModel[]) => {
        this.busList.data = data;
        this.table.renderRows();
        this.selection.clear();
      },
      error => console.log(error)
    );
  }
}
