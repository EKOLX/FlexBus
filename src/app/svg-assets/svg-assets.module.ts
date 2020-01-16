import { NgModule } from "@angular/core";
import { LinkedinSvg } from "./in-logo.svg";
import { BusSvg } from "./bus.svg";
import { ArrowSvg } from "./arrow.svg";

@NgModule({
  declarations: [LinkedinSvg, BusSvg, ArrowSvg],
  exports: [LinkedinSvg, BusSvg, ArrowSvg]
})
export class SvgAssetsModule {}
