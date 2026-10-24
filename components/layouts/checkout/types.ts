type DialogState =
  | { type: "wallet-picker" }
  | { type: "connecting"; walletId: string; walletName: string }
  | { type: "checking"; walletId: string; walletName: string }
  | { type: "declined"; walletId: string; walletName: string }
  | { type: "confirm" }
  | { type: "signing" }
  | { type: "confirming" }
  | { type: "error"; message: string }
  | null

export type { DialogState }
