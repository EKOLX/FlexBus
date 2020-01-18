export class Station {
  constructor(
    public id: number,
    public name: string,
    public slotsNumber: number
  ) {}
}

export class StationSlot {
  constructor(
    public id: number,
    public stationId: number,
    public busId?: number
  ) {}
}
