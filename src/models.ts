export type Edge = [number, number]
export type Edges = Edge[]

export type BFSGraphParams = {
  nodes: number
  edges: Edges
  origin: number
}

export type ParamStruct = {
  q: number
  n: number[]
  e: Edges[]
  s: number[]
}