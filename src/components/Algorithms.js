import { Queue, Stack } from './Datastructures'

function Algorithms(Graph, timerWait) {
    //All algo stuff in here, so we can have the graph to only manipulate the visual, and then reset in end
    // let visitedNodes = new Map()
    // let selectedNode = undefined;
    // let startNode = undefined;
    // let finishNode = undefined;

    async function bfs(startNodeID, endNodeID = undefined) {
    //set up
        var q = new Queue()
        var visitedNodes = new Map()
        var predNode = new Map()
        var selectedNodeID = undefined;
        let startNode = startNodeID

        //add startNode to visited
        Graph.setVisited(startNodeID, visitedNodes)
        q.enqueue(startNodeID)

        Graph.setStart(startNodeID, startNode)
    
    //run algo
        while(!q.isEmpty()) {
            let currentNodeID = q.dequeue();

            //If using endnode
            if(currentNodeID === endNodeID){
                let path = backtrack();
                Graph.setPath(path);
                return path
            }

            const node = Graph.getNode(currentNodeID)
            //TODO - set visitedColor
            Graph.setVisitedColor(node)
            Graph.selectNode(currentNodeID, selectedNodeID)
            selectedNodeID = currentNodeID;
            
            //Iterate through all neigbours and potentially add to queue
            for(let neighbourID of node.getNeighbours()){
                if(!visitedNodes.has(neighbourID)){
                    Graph.setVisited(neighbourID, visitedNodes)
                    //add to queue
                    q.enqueue(neighbourID)
                    //adding predesseor for backtracking
                    predNode.set(neighbourID, currentNodeID)
                    //TODO - Set color to inQueueColor
                    Graph.setInQueueColor(neighbourID)
                }
            }
            //Timer for slowing down
            await timer(timerWait)
        }
        return console.log('BFS done')

        function backtrack(){
            var path = []
            var current = endNodeID

            //Loopa
            while(current !== undefined){
                path.push(current)
                //if successfully found startNode
                if(current === startNodeID){
                    console.log("Backtracked: ", path)
                    return path
                }
                //going to pred
                current = predNode.get(current)
            }
            //returneras ifall inget hittas
            return console.error("Backtrack error")
        }
    }

    async function dfs(startNodeID) {
        //S be stack
        var S = new Stack()
        var visitedNodes = new Map()
        var selectedNodeID = undefined;
        let startNode = startNodeID

        S.push(startNodeID)
        Graph.setVisited(startNodeID, visitedNodes)

        Graph.setStart(startNodeID, startNode)

        while(!S.isEmpty()){
            let currentNodeID = S.pop()
            const node = Graph.getNode(currentNodeID)

            Graph.setVisitedColor(node)
            Graph.selectNode(currentNodeID, selectedNodeID)
            selectedNodeID = currentNodeID;

            for(let neighbourID of node.getNeighbours()){
                if(!visitedNodes.has(neighbourID)){
                    Graph.setVisited(neighbourID, visitedNodes)
                    S.push(neighbourID)
                    Graph.setInQueueColor(neighbourID)
                }
            }
            await timer(timerWait)
        }
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