import countries from '../../data/countries'
import Graph from './Graph'

function Graphs(bodyRef, width, height) {

    async function EUGraph(startNodeID, endNodeID){
        const euCountries = await countries().getEUCountries()
        const graph = await createGraph(euCountries, addCountriesToGraph, startNodeID, endNodeID)
        return graph
    }

    async function WorldGraph(startNodeID, endNodeID){
        const worldcountries = await countries().getWorldCountries()
        const graph = await createGraph(worldcountries, addCountriesToGraph, startNodeID, endNodeID)
        return graph
    }

    async function createGraph(data, addDataToGraph, startNodeID, endNodeID){
        let newGraph = new Graph(bodyRef, width, height)
        newGraph.setUp()
        await addDataToGraph(data, newGraph)
        newGraph.run()

        newGraph.setStart(startNodeID)
        newGraph.setFinish(endNodeID)
        return newGraph;
    }

    async function addCountriesToGraph(countries, newGraph){
        let boxHeight = calcBoxSize(countries.length)
        let edgeToNodeSize = 4;
        let nodeLength = Math.ceil(boxHeight / (edgeToNodeSize + 1))
        let edgeLength = Math.ceil(nodeLength * edgeToNodeSize)
        console.log("Nodelength: ", nodeLength)
        console.log("edgeLength: ", edgeLength)

        newGraph.setNodeRadius(nodeLength / 2)
        newGraph.setEdgeLength(edgeLength)

        await countries.forEach(country => {
            const nodeIDA = country.alpha3Code
            const multipleNodeID = country.borders
            newGraph.addNode(nodeIDA)
            newGraph.addMultipleEdges(nodeIDA, multipleNodeID)
        })
    }

    function calcBoxSize(dataSize) {
        var ratio = Math.ceil(width / height)
        var found = false
        var heightInBoxes = 1
        while(!found){
            // width * height
            let boxes = (heightInBoxes * ratio) * heightInBoxes
            if(boxes >= dataSize)
                found = true
            heightInBoxes += 1

        }
        return Math.ceil(height / heightInBoxes);
    }

    return {
        EUGraph,
        WorldGraph,
    }
}

export default Graphs;