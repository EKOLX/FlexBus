import { BusType } from "./enums.model";

export class Bus {
  constructor(
    public id: number,
    public plateNumber: string,
    public busType: BusType
  ) {}
}
