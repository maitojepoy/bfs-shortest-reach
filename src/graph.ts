import { Edges } from './models'

export class GraphNode {
  public readonly value: number
  private adjacents: GraphNode[]
  constructor(value: number) {
    this.value = value
    this.adjacents = []
  }

  public addAdjacent(node: GraphNode) {
    this.adjacents.push(node);
  }

  public getAdjacents(): GraphNode[] {
    return this.adjacents;
  }
}

export class Graph {
  public readonly nodes: GraphNode[]
  constructor(nodeCount: number) {
    this.nodes = [...Array(nodeCount).keys()].map(n => new GraphNode(n + 1))
  }

  public addEdges(edges: Edges): void {
    for (const [u, v] of edges) {
      this.nodes[u - 1].addAdjacent(this.nodes[v - 1])
      this.nodes[v - 1].addAdjacent(this.nodes[u - 1])
    }
  }
}
