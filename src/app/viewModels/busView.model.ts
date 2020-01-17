import { ModalType, BusType } from "../models/enums.model";
import { Bus } from "../models/bus.model";

export class BusModalViewModel {
  constructor(public modalType: ModalType) {}
}

export class BusViewModel extends Bus {
  stationAndSlot: string;
}
