import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { BusType } from "../../models/bus.model";
import { BusModalModel } from "src/app/viewModels/busView.model";
import { ModalType } from "src/app/models/enums.model";

@Component({
  selector: "app-bus-edit",
  templateUrl: "./bus-edit.component.html",
  styleUrls: ["./bus-edit.component.scss"]
})
export class BusEditComponent implements OnInit {
  busTypes: Array<BusType> = [];
  title: string;

  constructor(
    public dialogRef: MatDialogRef<BusEditComponent>,
    @Inject(MAT_DIALOG_DATA) public viewModel: BusModalModel
  ) {
    this.busTypes = new Array(
      { name: "Regular", value: 1 },
      { name: "Doubledecker", value: 2 },
      { name: "MiniBus", value: 3 },
      { name: "HybridBus", value: 4 }
    );
  }

  ngOnInit() {
    this.title =
      this.viewModel.modalType === ModalType.New
        ? "Add a new bus"
        : "Update the bus";
  }

  onSave(event: MouseEvent): void {
    event.preventDefault();
    this.dialogRef.close("saved");
  }
}
