import { NgModule } from "@angular/core";
import * as Material from "@angular/material";

@NgModule({
  imports: [
    Material.MatDialogModule,
    Material.MatButtonModule,
    Material.MatInputModule,
    Material.MatSelectModule,
    Material.MatTableModule,
    Material.MatCardModule,
    Material.MatPaginatorModule
  ],
  exports: [
    Material.MatDialogModule,
    Material.MatButtonModule,
    Material.MatInputModule,
    Material.MatSelectModule,
    Material.MatTableModule,
    Material.MatCardModule,
    Material.MatPaginatorModule
  ]
})
export class MaterialModule {}
