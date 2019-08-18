import Matter from 'matter-js'
import MatterAttractors from 'matter-attractors'
import countries from '../../data/countries'
import Algorithms from './Algorithms'

function Graph(ref, width, height) {
    Matter.use(MatterAttractors);

    let Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Constraint = Matter.Constraint,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint;

    let defaultColor = 'blue',
        selectColor = 'green',
        startColor = 'white',
        finishColor = 'yellow',
        visitedColor = 'red';

    let defaultRadius = 10,
        defaultEdgeLength = 50;

    //nodesNeighbours: id -> [...nodeIDS]
    let nodesNeighbours = new Map()
    //nodesBodies: id -> matter body
    let nodesBodies = new Map()
    //edges: id -> [nodeIDA, nodeIDB]
    let edges = new Map()
    //edgesBodies: id -> constraint
    let edgesBodies = new Map()
    let visitedNodes = new Map()
    let selectedNode = undefined;
    let startNode = undefined;
    let finishNode = undefined;
    let engine = setUpEngine()
    let render = setUpRender()


    function setUpEngine() {
        return Engine.create()
    }

    function setUpRender() {
        return Render.create({
            element: ref.current,
            engine: engine,
            options: {
                width: width,
                height: height,
                wireframes: false
            }
        })
    }

    function setUpBorders() {
        //Create node body
        let shapeWidth = 500
        let options = {
            render: {
                fillStyle: defaultColor,
                strokeStyle: defaultColor,
                lineWidth: 3
            },
            isStatic: true
        }
        const wallLeft = Bodies.rectangle(-shapeWidth/2, height/2, shapeWidth, height, options);
        const wallTop = Bodies.rectangle(width/2, -shapeWidth/2, width, shapeWidth, options);
        const wallRight = Bodies.rectangle(width+shapeWidth/2, height/2, shapeWidth, height, options);
        const wallBottom = Bodies.rectangle(width/2, height+shapeWidth/2, width, shapeWidth, options);
        const walls = [wallLeft, wallTop, wallRight, wallBottom]
        //Add to world engine
        World.add(engine.world, walls);
    }

    function setUpTestBodies() {
        //Create Ground and surrounding
        //var ground = Bodies.rectangle(400, height-50, 2500, 40, { isStatic: true });
        //World.add(engine.world, ground);

        //Here should be the reading of graph from file or data

        addNode('A')
        addNode('B')
        addNode('C')
        addNode('D')
        addNode('E')
        addNode('F')
        addNode('G')
        addNode('H')
        addNode('I')
        addNode('J')
        addNode('K')
        addNode('L')
        addNode('M')
        addNode('N')

        addEdge('A', 'B')
        addEdge('A', 'C')
        addEdge('B', 'C')
        addEdge('A', 'D')
        addEdge('A', 'E')
        addEdge('B', 'F')
        addEdge('B', 'G')
        addEdge('B', 'H')
        
        addEdge('I', 'J')
        addEdge('I', 'K')
        addEdge('G', 'I')
        addEdge('K', 'L')
        addEdge('L', 'M')
        addEdge('L', 'N')

        selectNode('F')

        addNodeToVisited('A')
        setTimeout(() => {
            addNodeToVisited('B')
            selectNode('D')
        }, 2000)
    }

    function setUpTestBodies2() {
        setUpCountries();
    }

    async function setUpCountries() {
        //set upp more bodies
        const euCountries = await countries().getEUCountries()
        euCountries.forEach(country => {
            const nodeIDA = country.alpha3Code
            const multipleNodeID = country.borders
            addNode(nodeIDA)
            addMultipleEdges(nodeIDA, multipleNodeID)
        })
        selectNode('AUT')
        addNodeToVisited('SWE')
        addNodeToVisited('FIN')
        setStart('NOR')
        setFinish('BLR')
        setStaticNode('BLR')
        setStaticNode('HRV')
    }

    function setUp() {
        /** 
         *  gravity of -5.5 - stable fast, but very powerful beginning movements if starting at same pos. Removed powerful with random startpos
         *  gravity of -3.5 might be a bit stiff, but still not to wiggly
         *  gravity of -2.5 Feels a bit to wiggly. Wiggles a long time
        */
        engine.world.gravity.y = 0;
        MatterAttractors.Attractors.gravityConstant = -7.5;

        setUpBorders();
        setUpTestBodies2();
        addMouseConstrain();
        runEngineAndRender()
    }

    function addNode(id, radius = defaultRadius) {
        //error handling
        if(nodesBodies.get(id)) return console.error('tried to add new node for already existing nodeID: ', id)

        //add empty neighbours
        let neighbours = []
        nodesNeighbours.set(id, neighbours)

        //Create node body
        let pos = {
            x: Math.random() * width,
            y: Math.random() * height
        }
        let options = {
            render: {
                fillStyle: defaultColor,
                strokeStyle: defaultColor,
                lineWidth: 3
            },
            plugin: {
                attractors: [
                    MatterAttractors.Attractors.gravity
                ]
            }
        }
        let node = Bodies.circle(pos.x, pos.y, radius, options);
        nodesBodies.set(id, node)

        //Add to world engine
        World.add(engine.world, node);
    }

    function addEdge(nodeIDA, nodeIDB, length = defaultEdgeLength) {
        //TODO - handle

        var nodeBodyA = nodesBodies.get(nodeIDA)
        var nodeBodyB = nodesBodies.get(nodeIDB)

        //error case
        if(!nodeBodyA || !nodeBodyB) {
            if(!nodeBodyA) {
                addNode(nodeIDA)
                nodeBodyA = nodesBodies.get(nodeIDA)
            }
            if(!nodeBodyB) {
                addNode(nodeIDB)
                nodeBodyB = nodesBodies.get(nodeIDB)
            }
            console.error("Created new node - couldn't find nodeID ", nodeIDA)
        }
        //Add constraint and put in world
        let constrainOptions = {
            length: length,
            damping: 0.1,
            stiffness: 0.01
        }
        //Put edge object in array for body and neighbours
        let constraint = createConstraint(nodeBodyA, nodeBodyB, constrainOptions)
        //TODO - add sorting for this
        let edgeID = nodeIDA+nodeIDB;
        edgesBodies.set(edgeID, constraint)
        edges.set(edgeID, [nodeIDA, nodeIDB])
    }

    function addMultipleEdges(nodeIDA, multipleNodeID, length = 100) {
        multipleNodeID.forEach(nodeIDB => {
            addEdge(nodeIDA, nodeIDB)
        })
    }

    function addNodeToVisited(nodeID) {
        const {nodeBody, nodeNeighbours} = getNode(nodeID)

        //error
        if(!nodeBody || !nodeNeighbours) {
            return console.error("nodebody and/or nodeNeighbours not found for nodeID:", nodeID)
        }

        //add to array
        visitedNodes.set(nodeID, nodeNeighbours)
        //set specific color for visited nodes
        setColor(nodeBody, visitedColor)
    }

    function selectNode(nodeID) {
        changeColor(nodeID, selectedNode, selectColor)
    }

    function setStart(nodeID) {
        changeColor(nodeID, startNode, startColor)
    }

    function setFinish(nodeID) {
        changeColor(nodeID, finishNode, finishColor)
    }

    function changeColor(nodeID, valToModify, color) {
        //Get node body and neighbours
        const {nodeBody, ...other} = getNode(nodeID)
        if(!nodeBody) return console.error("Couldn't set Color - No nodeID found")
        //set selected variable to node and get the prev
        const prevSelectedID = valToModify
        valToModify = nodeID

        //change color on newly selected node.
        setColor(nodeBody, color)

        //Change back color of prev selected node
        const prevNode = getNode(prevSelectedID)
        if(!prevNode.nodeBody) return
        setColor(prevNode.nodeBody, defaultColor)
    }

    function getNode(nodeID) {
        const nodeBody = nodesBodies.get(nodeID)
        const nodeNeighbours = nodesNeighbours.get(nodeID)
        if(!nodeBody || !nodeNeighbours) {
            console.error("nodebody and/or nodeNeighbours not found for nodeID:", nodeID)
            return {} 
        }
        return {nodeBody, nodeNeighbours}
    }

    function setColor(nodeBody, color) {
        nodeBody.render.fillStyle = color
        nodeBody.render.strokeStyle = color
    }

    function createConstraint(bodyA, bodyB, options) {
        //TODO - looks so theres no already exisitng
        let optionsObj = {bodyA, bodyB, ...options}
        let constraint = Constraint.create(optionsObj)
        constraint.render.type = 'line';
        constraint.render.anchors = false;
        World.add(engine.world, constraint);
        return constraint
    }

    function runEngineAndRender() {
        // run the engine
        Engine.run(engine);
        Render.run(render);  
    }

    function addMouseConstrain() {
        // add mouse control
        var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                visible: false
                }
            }
            });
        World.add(engine.world, mouseConstraint);
    }

    function setStaticNode(nodeId) {
        const {nodeBody, nodeNeighbours} = getNode(nodeId)
        if (!nodeBody) return 
        nodeBody.isStatic = true;
        //Body.setStatic(nodeBody, true);
    }

    return {
        setUp,
        setUpTestBodies,
        addNode,
        addEdge,
        addMultipleEdges,
        selectNode,
        setStart,
        setFinish,
        addNodeToVisited,
        setStaticNode,
    }
}

export default Graph;