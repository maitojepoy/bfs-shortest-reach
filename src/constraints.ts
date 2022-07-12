import { Edge, Edges, ParamStruct } from './models'

const inRange = (value: number, min: number, max: number) => value >= min && value <= max

const validateRange = (min: number, max: number) => (key: string, field: any) => inRange(field[key], min, max)

const validateItemsInRange = (min: number, max: number) => 
  (key: string, field: any) => 
    field[key].every((node: number) => inRange(node, min, max))

const validateEdgeCount = (key: string, field: any) => field[key].every((edges: Edges, i: number) => edges.length >= 1 && edges.length <= (field.n[i] * (field.n[i] - 1)) / 2)

const isNodeIndex = (value: number, field: any, graphIndex: number) => value >= 1 && value <= field.n[graphIndex]

const validateNodeIndices = (key: string, field: any) => 
  field[key].every((edgegroup: Edges, i: number) =>
    edgegroup.every((edge: Edge) =>
      edge.every(e => isNodeIndex(e, field, i))
  ))

const validateNodeItems = (key: string, field: any) => field[key].map((node: number, i: number) => isNodeIndex(node, field, i))

export const validateParamConstraints = (p: ParamStruct) => {
  const constraints = [
    { key: 'q', validator: validateRange(1, 10), errorMsg: 'Requirement failed on query count: must have 1 to 10 queries' },
    { key: 'n', validator: validateItemsInRange(2, 1000), errorMsg: 'Requirement failed on nodes: must have between 2 to 1000 nodes per graph' },
    { key: 'e', validator: validateEdgeCount, errorMsg: 'Requirement failed on edges: edge count exceeded' },
    { key: 'e', validator: validateNodeIndices, errorMsg: 'Requirement failed on edges: every edge points must be an existing node' },
    { key: 's', validator: validateNodeItems, errorMsg: 'Requirement failed on origin: origin must be an existing node'  },
  ]
  
  for (const constraint of constraints) {
    if (!constraint.validator(constraint.key, p)) {
      throw new Error(constraint.errorMsg)
    }
  }
}