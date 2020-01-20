import { HttpHeaders } from "@angular/common/http";
import { BusType } from "../models/enums.model";

export const busTypes = new Array(
  { name: BusType[BusType.Regular], value: BusType.Regular },
  { name: BusType[BusType.Doubledecker], value: BusType.Doubledecker },
  { name: BusType[BusType.MiniBus], value: BusType.MiniBus },
  { name: BusType[BusType.HybridBus], value: BusType.HybridBus }
);

export const busTableColumns = [
  "select",
  "plateNumber",
  "busType",
  "stationAndSlot"
];

export const stationTableColumns = ["select", "name", "slotsNumber"];

export const httpConfigs = {
  serverApi: "http://localhost:3000",
  options: {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  }
};
