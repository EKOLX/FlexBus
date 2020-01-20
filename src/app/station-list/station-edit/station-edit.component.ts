import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ModalType } from "src/app/models/enums.model";
import { StationModalViewModel } from "src/app/viewModels/stationView.model";
import { StationService } from "src/app/services/station.service";

@Component({
  selector: "app-station-edit",
  templateUrl: "./station-edit.component.html",
  styleUrls: ["./station-edit.component.scss"]
})
export class StationEditComponent implements OnInit {
  title: string;
  isBusy: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<StationEditComponent>,
    @Inject(MAT_DIALOG_DATA) public viewModel: StationModalViewModel,
    private stationService: StationService
  ) {}

  ngOnInit() {
    this.title =
      this.viewModel.modalType === ModalType.New
        ? "Add a new station"
        : "Update the station";
  }

  onSubmit() {
    this.isBusy = true;
    this.stationService.saveStation(this.viewModel.station).subscribe(
      () => {
        this.isBusy = false;
        this.dialogRef.close(true);
      },
      error => console.log(error)
    );
  }
}
