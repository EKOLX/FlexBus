import { ModalType } from "../models/enums.model";

export class BusModalModel {
  constructor(public modalType: ModalType) {}
}

export class BusDetailModel {
  constructor(
    public plateNumber: string,
    public busType: number,
    public stationAndSlot: string
  ) {}
}
