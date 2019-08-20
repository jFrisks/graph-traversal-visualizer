import countries from '../../data/countries'
import Graph from './Graph'

function Graphs(bodyRef, width, height) {

    async function EUGraph(startNodeID, endNodeID){
        const euCountries = await countries().getEUCountries()
        return createGraph(euCountries, addCountriesToGraph, startNodeID, endNodeID)
    }

    async function WorldGraph(startNodeID, endNodeID){
        const worldcountries = await countries().getWorldCountries()
        return createGraph(worldcountries, addCountriesToGraph, startNodeID, endNodeID)
    }

    function createGraph(data, addDataToGraph, startNodeID, endNodeID){
        let newGraph = new Graph(bodyRef, width, height)
        newGraph.setUp()
        addDataToGraph(data, newGraph)

        newGraph.setStart(startNodeID)
        newGraph.setFinish(endNodeID)
        return newGraph;
    }

    function addCountriesToGraph(countries, newGraph){
        countries.forEach(country => {
            const nodeIDA = country.alpha3Code
            const multipleNodeID = country.borders
            newGraph.addNode(nodeIDA)
            newGraph.addMultipleEdges(nodeIDA, multipleNodeID)
        })
    }

    return {
        EUGraph,
        WorldGraph,
    }
}

export default Graphs;