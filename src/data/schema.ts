export type Usage = {
  owner: string
  status: string
  costs: number
  region: string
  stability: number
  lastEdited: string
}

export type OverviewData = {
  date: string
  "API Calls": number
  "Data Processed": number
  Queries: number
  "Revenue": number
  "Sign Ups": number
  "Active Sessions": number
}
