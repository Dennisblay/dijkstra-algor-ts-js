import Graph, {dijkstra} from "./dijkstra/dijkstra.js";

const newGraph = new Graph()

type Edges = [string, string, number]
const edges: Edges[] = [
    ['X', 'A', 7],
    ['X', 'B', 2],
    ['X', 'C', 3],
    ['X', 'E', 4],
    ['A', 'B', 3],
    ['A', 'D', 4],
    ['B', 'D', 4],
    ['B', 'H', 5],
    ['C', 'L', 2],
    ['D', 'F', 1],
    ['F', 'H', 3],
    ['G', 'H', 2],
    ['G', 'Y', 2],
    ['I', 'J', 6],
    ['I', 'K', 4],
    ['I', 'L', 4],
    ['J', 'L', 1],
    ['K', 'Y', 5],
];

for (const edge of edges) {
    newGraph.addEdge(...edge)
}

// console.log(newGraph.edges)
// console.log(newGraph.weights)

console.log(dijkstra(newGraph, "E", "F"));
