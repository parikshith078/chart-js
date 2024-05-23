
interface ModeCount {
  [key: string]: number;
}

export interface OutputFormat {
  allTime: ModeCount;
  last3Months: ModeCount;
  lastMonth: ModeCount;
}

export interface DataPoint {
  x: number;
  y: number;
}
export interface DataDict {
  [date: string]: number;
}
