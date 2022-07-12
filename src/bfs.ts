import { BFSGraphParams } from './models'
import { validateParamConstraints } from './constraints'
import { Graph, GraphNode } from './graph'

export class BFSGraph {
  private params: BFSGraphParams[]
  private graphs: Graph[]
  private readonly EDGE_VALUE = 6

  constructor(params: BFSGraphParams[]) {
    this.params = params
    this.graphs = []
  }

  private validateParams(): void {
    validateParamConstraints({
      q: this.params.length,
      n: this.params.map(({ nodes }) => nodes),
      e: this.params.map(({ edges }) => edges),
      s: this.params.map(({ origin }) => origin),
    })
  }

  public generateGraphs(): void {
    this.validateParams()
    for (const q in this.params) {
      const { nodes, edges } = this.params[q]

      const graph = new Graph(nodes)
      graph.addEdges(edges)

      this.graphs.push(graph)
    }
  }

  public calculateDistanceFromNodes(): Array<number[]> {
    const distances = []
    for (let graph = 0; graph < this.graphs.length; graph++) {
      distances.push(this.calculateDistancesWithGraph(graph))
    }
    return distances
  }

  private calculateDistancesWithGraph(graphIndex: number): number[] {
    const { origin } = this.params[graphIndex]
    const graph = this.graphs[graphIndex]
    const nodeOrigin = graph.nodes[origin - 1]
    let depth = 1
    let nodeDistances = []
    for (const node of graph.nodes.filter(({ value }) => value !== origin)) {
      nodeDistances.push(this.findDestinationDepth(nodeOrigin, node.value))
    }
    return nodeDistances
  }

  private findDestinationDepth(origin: GraphNode, destination: number): number {
    const doneQueue: GraphNode[] = []
    const queue = [{ node: origin, depth: 1 }]
    while (queue.length > 0) {
      const { node: target, depth } = queue[0]
      for (const node of target.getAdjacents()) {
        if (node.value === destination) {
          return this.EDGE_VALUE * depth
        }
        if (!doneQueue.map(({ value }) => value).includes(node.value)) {
          queue.push({ node, depth: depth + 1 })
        }
      }
      doneQueue.push(target)
      queue.shift()
    }
    return -1
  }
}
