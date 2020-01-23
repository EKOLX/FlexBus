import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatTableDataSource,
  MatSort,
  MatTable,
  MatSelect,
  MatOption
} from "@angular/material";
import { MatPaginator } from "@angular/material/paginator";
import { SelectionModel } from "@angular/cdk/collections";
import { ModalType, BusType } from "../models/enums.model";
import { Bus } from "../models/bus.model";
import { Station, StationSlot } from "../models/station.model";
import { BusModalViewModel, BusViewModel } from "../viewModels/busView.model";
import { busTableColumns, busTypes } from "src/app/db/local.db";
import { BusEditComponent } from "./bus-edit/bus-edit.component";
import { CommonService } from "../services/common.service";
import { ConfirmationComponent } from "../shared/confirmation/confirmation.component";

@Component({
  selector: "app-bus-list",
  templateUrl: "./bus-list.component.html",
  styleUrls: ["./bus-list.component.scss"]
})
export class BusListComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<BusViewModel>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("stationSelect", { static: true }) stationSelect: MatSelect;
  @ViewChild("busTypeSelect", { static: true }) busTypeSelect: MatSelect;

  busList: MatTableDataSource<BusViewModel> = new MatTableDataSource<
    BusViewModel
  >();
  selection = new SelectionModel<BusViewModel>(false, []);
  displayedColumns: string[] = busTableColumns;
  stationOptions: Station[] = [];
  selectedStationOptions = [];
  busTypeOptions = busTypes;
  selectedBusTypeOptions = [];
  plateNumberOption: string = "";

  constructor(public dialog: MatDialog, private commonService: CommonService) {}

  ngOnInit() {
    this.loadDataSource();
  }

  onAdd(): void {
    const model = new BusModalViewModel(ModalType.New);
    model.bus = new Bus(0, "", BusType.Regular);
    this.launchEditDialog(model);
  }

  onEdit(): void {
    const selected = this.selection.selected[0];
    const model = new BusModalViewModel(ModalType.Edit);
    model.bus = new Bus(selected.id, selected.plateNumber, selected.busType);
    model.stationId = selected.stationId;
    model.slotId = selected.slotId;
    model.slotNumber = selected.slotNumber;
    this.launchEditDialog(model);
  }

  onDelete(): void {
    this.launchConfirmDialog({
      title: `Are you sure you want to delete the "${this.selection.selected[0].plateNumber}" bus?`
    });
  }

  onDblClick(row: BusViewModel): void {
    this.selection.hasValue() ? null : this.selection.toggle(row);
    this.onEdit();
    this.selection.clear();
  }

  onStationApply(): void {
    this.selectedStationOptions = (this.stationSelect
      .selected as MatOption[]).map(op => op.value);
    this.loadDataSource();

    this.stationSelect.close();
  }

  onBusTypeApply(): void {
    this.loadDataSource();
    this.selectedBusTypeOptions = (this.busTypeSelect
      .selected as MatOption[]).map(op => op.value);
    this.loadDataSource();

    this.busTypeSelect.close();
  }

  onBusNumberApply(): void {
    this.loadDataSource();
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
    this.commonService.getBusesStationsSlots().subscribe(
      (result: [Bus[], Station[], StationSlot[]]) => {
        // TODO: reconsider mapping implementation
        this.stationOptions = result[1];

        let stations: Station[] = [];
        let stationSlots: StationSlot[] = [];
        let buses: Bus[] = [];

        if (this.plateNumberOption) {
          buses = result[0].filter(
            b =>
              b.plateNumber.toLocaleUpperCase() ===
              this.plateNumberOption.toLocaleUpperCase()
          );
        } else {
          if (this.selectedStationOptions.length > 0) {
            stations = result[1].filter(st =>
              this.selectedStationOptions.includes(st.id)
            );
            stationSlots = result[2].filter(sl =>
              this.selectedStationOptions.includes(sl.stationId)
            );
            buses = result[0].filter(b =>
              stationSlots.map(sl => sl.busId).includes(b.id)
            );
          } else {
            stations = result[1];
            stationSlots = result[2];
            buses = result[0];
          }

          if (this.selectedBusTypeOptions.length > 0) {
            buses = buses.filter(b =>
              this.selectedBusTypeOptions.includes(b.busType)
            );
          }
        }

        const dataSource = buses.map(b => {
          let stationAndSlot: string = "";
          const busSlot = stationSlots.find(sl => sl.busId === b.id);

          if (busSlot) {
            const station = stations.find(s => s.id === busSlot.stationId);
            stationAndSlot = `${station.name} @ slot: ${busSlot.slotNumber}`;
          }

          return new BusViewModel(
            b.id,
            b.plateNumber,
            b.busType,
            BusType[b.busType],
            busSlot ? busSlot.stationId : null,
            busSlot ? busSlot.id : null,
            busSlot ? busSlot.slotNumber : null,
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

  private launchEditDialog(model: BusModalViewModel): void {
    const dialogRef = this.dialog.open(BusEditComponent, {
      // TODO: make width responsive
      width: "500px",
      data: model
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadDataSource();
      this.selection.clear();
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
          this.commonService
            .removeBusAndSlot(selected.id, selected.slotId)
            .subscribe(
              () => {
                console.info("Bus and slot deleted");
                this.loadDataSource();
                this.selection.clear();
              },
              error => {
                // NOTE: json-server throws error in spite of deletes the row
                // so anyway continue adding
                console.log(error);
                this.loadDataSource();
                this.selection.clear();
              }
            );
        }
      } else this.selection.clear();
    });
  }
}
