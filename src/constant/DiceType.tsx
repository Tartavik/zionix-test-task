export enum alertTypeValue {
  success = "success",
  error = "error",
  info = "info"
}

export interface GameResult {
  time: string;
  guess: string;
  result: number;
  isWin: boolean;
}