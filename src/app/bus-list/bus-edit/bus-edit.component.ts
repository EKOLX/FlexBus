import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { BusModalViewModel } from "src/app/viewModels/busView.model";
import { ModalType } from "src/app/models/enums.model";
import { BusService } from "src/app/services/bus.service";
import { busType } from "src/app/services/local.db";

@Component({
  selector: "app-bus-edit",
  templateUrl: "./bus-edit.component.html",
  styleUrls: ["./bus-edit.component.scss"]
})
export class BusEditComponent implements OnInit {
  busTypes = [];
  title: string;

  constructor(
    public dialogRef: MatDialogRef<BusEditComponent>,
    @Inject(MAT_DIALOG_DATA) public viewModel: BusModalViewModel,
    private busService: BusService
  ) {
    this.busTypes = busType;
  }

  ngOnInit() {
    this.title =
      this.viewModel.modalType === ModalType.New
        ? "Add a new bus"
        : "Update the bus";
  }

  onSave(event: MouseEvent): void {
    event.preventDefault();
    // TODO: save data
    this.dialogRef.close(true);
  }
}
