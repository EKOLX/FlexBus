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
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatCheckboxModule,
    Material.MatMenuModule,
    Material.MatToolbarModule,
    Material.MatProgressSpinnerModule
  ],
  exports: [
    Material.MatDialogModule,
    Material.MatButtonModule,
    Material.MatInputModule,
    Material.MatSelectModule,
    Material.MatTableModule,
    Material.MatCardModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatCheckboxModule,
    Material.MatMenuModule,
    Material.MatToolbarModule,
    Material.MatProgressSpinnerModule
  ]
})
export class MaterialModule {}
