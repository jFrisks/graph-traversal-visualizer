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

    async function addCountriesToGraph(countries, Graph){
        console.log("Adding countries to graph ", Graph)
        Graph.calcSetNodeEdgeSize(countries.length)
        console.log("calculated and set node edge size")
        await countries.forEach(country => {
            const nodeIDA = country.alpha3Code
            const multipleNodeID = country.borders
            Graph.addNode(nodeIDA)
            Graph.addMultipleEdges(nodeIDA, multipleNodeID)
        })
    }

    return {
        EUGraph,
        WorldGraph,
        addCountriesToGraph,
    }
}

export default Graphs;