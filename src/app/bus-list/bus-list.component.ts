import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatTableDataSource,
  MatSort,
  MatTable
} from "@angular/material";
import { MatPaginator } from "@angular/material/paginator";
import { SelectionModel } from "@angular/cdk/collections";
import { ModalType, BusType } from "../models/enums.model";
import { Bus } from "../models/bus.model";
import { Station, StationSlot } from "../models/station.model";
import { BusModalViewModel, BusViewModel } from "../viewModels/busView.model";
import { busTableColumns } from "src/app/services/local.db";
import { BusEditComponent } from "./bus-edit/bus-edit.component";
import { CommonService } from "../services/common.service";
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
  displayedColumns: string[] = busTableColumns;
  selection = new SelectionModel<BusViewModel>(false, []);

  constructor(
    public dialog: MatDialog,
    private commonService: CommonService,
    private busService: BusService
  ) {}

  ngOnInit() {
    this.loadDataSource();
  }

  onAdd(): void {
    this.launchDialog(ModalType.New);
  }

  onEdit(): void {
    this.launchDialog(ModalType.Edit);
  }

  Delete(): void {
    const selected = this.selection.selected[0];
    if (selected) {
      // TODO: Refactor callbacks hell
      this.busService.removeBus(selected.id).subscribe(
        () => this.loadDataSource(),
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

  private loadDataSource(): void {
    this.commonService.getBusesStationSlots().subscribe(
      (data: [Bus[], Station[], StationSlot[]]) => {
        const dataSource = data[0].map(b => {
          let stationAndSlot: string = "";
          const busSlot = data[2].find(sl => sl.busId === b.id);

          if (busSlot) {
            const station = data[1].find(s => s.id === busSlot.stationId);
            stationAndSlot = `${station.name} @ slot: ${busSlot.id}`;
          }

          return new BusViewModel(
            b.id,
            b.plateNumber,
            BusType[b.busType],
            stationAndSlot
          );
        });

        this.busList = new MatTableDataSource<BusViewModel>(dataSource);
        this.busList.paginator = this.paginator;
        this.busList.sort = this.sort;
      },
      error => console.log(error)
    );
  }

  private launchDialog(modalType: ModalType): void {
    const dialogRef = this.dialog.open(BusEditComponent, {
      // TODO: make width responsive
      width: "500px",
      data: new BusModalViewModel(modalType)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadDataSource();
    });
  }
}
