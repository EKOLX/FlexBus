import { Bus } from "../models/bus.model";
import { BusType } from "../models/enums.model";
import { ModalViewModel } from "./commonView.model";

export class BusModalViewModel extends ModalViewModel {
  bus: Bus;
  stationId: number;
  slotId: number;
  slotNumber: number;
}

export class BusViewModel extends Bus {
  constructor(
    id: number,
    plateNumber: string,
    busType: BusType,
    public busTypeName: string,
    public stationId: number,
    public slotId: number,
    public slotNumber: number,
    public stationAndSlot: string
  ) {
    super(id, plateNumber, busType);
  }
}
