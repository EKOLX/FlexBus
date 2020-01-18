import { BusType } from "../models/enums.model";

export const busTypes = new Array(
  { name: BusType[BusType.Regular], value: BusType.Regular },
  { name: BusType[BusType.Doubledecker], value: BusType.Doubledecker },
  { name: BusType[BusType.MiniBus], value: BusType.MiniBus },
  { name: BusType[BusType.HybridBus], value: BusType.HybridBus }
);
