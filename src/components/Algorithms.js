import Graph from './GraphView/Graph'
import { Queue } from './Datastructures'

function Algorithms(Graph) {
    //All algo stuff in here, so we can have the graph to only manipulate the visual, and then reset in end
    // let visitedNodes = new Map()
    // let selectedNode = undefined;
    // let startNode = undefined;
    // let finishNode = undefined;
    let timerWait = 500;

    async function bfs(startNodeID, finishNodeID) {
    //set up
        var q = new Queue()
        var visitedNodes = new Map()
        var selectedNodeID = undefined;

        //add startNode to visited
        Graph.setVisited(startNodeID, visitedNodes)
        q.enqueue(startNodeID)

        Graph.setStart(startNodeID)
        Graph.setFinish(finishNodeID)
    
    //run algo
        while(!q.isEmpty()) {
            let currentNodeID = q.dequeue();
            Graph.selectNode(currentNodeID, selectedNodeID)
            selectedNodeID = currentNodeID;
            const {nodeBody, nodeNeighbours} = Graph.getNode(currentNodeID)

            //Iterate through all neigbours and potentially add to queue
            for(let neighbourID of nodeNeighbours){
                if(!visitedNodes.has(neighbourID)){
                    Graph.setVisited(neighbourID, visitedNodes)
                    q.enqueue(neighbourID)
                }
            }
            await timer(timerWait)
        }

        return console.log('BFS done')
    }

    function dfs() {

    }

    return {
        bfs,
        dfs
    }
}

function timer(ms) {
    return new Promise(res => setTimeout(res, ms))
}

export default Algorithms;