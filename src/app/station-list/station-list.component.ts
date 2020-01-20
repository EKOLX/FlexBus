import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatTable,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { Station } from "../models/station.model";
import { ModalType } from "../models/enums.model";
import { StationModalViewModel } from "../viewModels/stationView.model";
import { stationTableColumns } from "src/app/db/local.db";
import { StationService } from "../services/station.service";
import { StationEditComponent } from "./station-edit/station-edit.component";
import { ConfirmationComponent } from "../shared/confirmation/confirmation.component";

@Component({
  selector: "app-station-list",
  templateUrl: "./station-list.component.html",
  styleUrls: ["./station-list.component.scss"]
})
export class StationListComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<Station>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  stationList = new MatTableDataSource<Station>();
  selection = new SelectionModel<Station>(false, []);
  displayedColumns: string[] = stationTableColumns;

  constructor(
    public dialog: MatDialog,
    private stationService: StationService
  ) {}

  ngOnInit() {
    this.loadDataSource();
  }

  onAdd(): void {
    const model = new StationModalViewModel(ModalType.New);
    model.station = new Station(0, "", null);
    this.launchEditDialog(model);
  }

  onEdit(): void {
    const model = new StationModalViewModel(ModalType.Edit);
    const station = this.selection.selected[0];
    model.station = new Station(station.id, station.name, station.slotsNumber);
    this.launchEditDialog(model);
  }

  onDelete(): void {
    this.launchConfirmDialog({
      title: `Are you sure you want to delete the "${this.selection.selected[0].name}"?`
    });
  }

  onDblClick(row: Station): void {
    this.selection.hasValue() ? null : this.selection.toggle(row);
    this.onEdit();
    this.selection.clear();
  }

  private loadDataSource(): void {
    this.stationService.getStations().subscribe(
      (data: Station[]) => {
        this.stationList = new MatTableDataSource<Station>(data);
        this.stationList.paginator = this.paginator;
        this.stationList.sort = this.sort;
      },
      error => console.log(error)
    );
  }

  private launchEditDialog(model: StationModalViewModel): void {
    const dialogRef = this.dialog.open(StationEditComponent, {
      // TODO: make width responsive
      width: "500px",
      data: model
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadDataSource();
    });
  }

  private launchConfirmDialog(data: any): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      // TODO: make width responsive
      width: "500px",
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.toDelete) {
        const selected = this.selection.selected[0];
        if (selected) {
          this.stationService.deleteStation(selected.id).subscribe(() => {
            console.info("Station deleted");
            this.loadDataSource();
            this.selection.clear();
          });
        }
      } else this.selection.clear();
    });
  }
}
