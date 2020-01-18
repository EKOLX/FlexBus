import { ModalType } from "../models/enums.model";
import { Bus } from "../models/bus.model";

export class BusModalViewModel {
  constructor(public modalType: ModalType) {}
}

export class BusViewModel extends Bus {
  constructor(
    id: number,
    plateNumber: string,
    busType: string,
    public stationAndSlot: string
  ) {
    super(id, plateNumber, busType);
  }
}
