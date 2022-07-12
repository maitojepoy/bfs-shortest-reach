import { BFSGraph } from './bfs'
import { BFSGraphParams } from './models'

const queries: BFSGraphParams[] = [
  {
    nodes: 6,
    edges: [[1, 2], [2, 3], [3, 4], [1, 5]],
    origin: 1
  },
  {
    nodes: 4,
    edges: [[1, 2], [1, 3]],
    origin: 1
  },
  {
    nodes: 3,
    edges: [[2, 3]],
    origin: 2
  },
  {
    nodes: 7,
    edges: [[1, 2], [1, 3], [3, 4], [2, 5]],
    origin: 2
  }
]

const bfs = new BFSGraph(queries)
try {
  bfs.generateGraphs()
  console.log(bfs.calculateDistanceFromNodes())
} catch(error) {
  if (error instanceof Error) {
    console.error(error.message)
  }
  process.exit()
}
