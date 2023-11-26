class Graph {
    edges: { [key: string]: string[] };
    weights: { [key: string]: number };

    constructor() {
        /*
        self.edges is a dict of all possible next nodes
        e.g. {'X': ['A', 'B', 'C', 'E'], ...}
        self.weights has all the weights between two nodes,
        with the two nodes as a tuple as the key
        e.g. {('X', 'A'): 7, ('X', 'B'): 2, ...}
        */
        this.edges = {};
        this.weights = {};
    }

    addEdge(fromNode: string, toNode: string, weight: number) {
        if (!this.edges[fromNode]) {
            this.edges[fromNode] = [];
        }

        if (!this.edges[toNode]) {
            this.edges[toNode] = [];
        }

        this.edges[fromNode].push(toNode);
        this.edges[toNode].push(fromNode);
        this.weights[`${fromNode}-${toNode}`] = weight;
        this.weights[`${toNode}-${fromNode}`] = weight;
    }
}


export const dijkstra = (graph: Graph, initial: string, end: string): string[] => {
    /*
    shortest paths is a dict of nodes
    whose value is a tuple of (previous node, weight)
    */

    const shortestPaths: { [key: string]: [string, number] } = {[initial]: ['', 0]};
    let currentNode = initial;
    const visited: Set<string> = new Set();

    while (currentNode !== end) {
        visited.add(currentNode);
        const destinations = graph.edges[currentNode];
        const weightToCurrentNode = shortestPaths[currentNode][1];


        for (const nextNode of destinations) {
            const weight = graph.weights[`${currentNode}-${nextNode}`] + weightToCurrentNode;
            if (!(nextNode in shortestPaths)) {
                shortestPaths[nextNode] = [currentNode, weight];
            } else {
                const currentShortestWeight = shortestPaths[nextNode][1];
                if (currentShortestWeight > weight) {
                    shortestPaths[nextNode] = [currentNode, weight];
                }
            }
        }
        const nextDestinations: { [key: string]: [string, number] } = {};
        for (const node in shortestPaths) {
            if (!(visited.has(node))) {
                nextDestinations[node] = shortestPaths[node];
            }
        }
        if (Object.keys(nextDestinations).length === 0)
            return ["Route Not Possible"]


        currentNode = Object.keys(nextDestinations).reduce((a, b) => {
                return nextDestinations[a][1] < nextDestinations[b][1] ? a : b
            }
        );

    }

    const path: string[] = [];
    while (currentNode !== initial) {
        path.push(currentNode);
        currentNode = shortestPaths[currentNode][0];
    }
// Reverse path
    path.push(initial);
    return path.reverse();
}


export default Graph;
