import Graph from './Graph'
import { Queue } from './Datastructures'

function Algorithms(Graph) {
    //All algo stuff in here, so we can have the graph to only manipulate the visual, and then reset in end
    let visitedNodes = []
    let selectedNode = undefined;
    let startNode = undefined;
    let finishNode = undefined;

    function bfs(startNodeID, finishNodeID) {
        //initialize visitedArray - in Graph
        let q = new Queue()
        visitedNodes = new Map()
        selectedNode = undefined;
        startNode = startNodeID;
        finishNode = finishNodeID;


    }

    function dfs() {

    }

    return {
        bfs,
        dfs
    }
}

export default Algorithms;