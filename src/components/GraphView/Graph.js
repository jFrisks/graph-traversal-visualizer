import Matter from 'matter-js'
import MatterAttractors from 'matter-attractors'
import countries from '../../data/countries'
import Algorithms from '../Algorithms'

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
        selectColor = 'orange',
        startColor = 'white',
        finishColor = 'yellow',
        visitedColor = 'red',
        inQueueColor = 'white',
        pathColor = 'green';

    let defaultRadius = 10,
        defaultEdgeLength = 50;

    let nodes = new Map()
    //nodesNeighbours: id -> [...nodeIDS]
    let nodesNeighbours = new Map()
    //nodesBodies: id -> matter body
    let nodesBodies = new Map()
    //edges: id -> [nodeIDA, nodeIDB]
    let edges = new Map()
    //edgesBodies: id -> constraint
    let edgesBodies = new Map()

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

    function setUpTestBodies2() {
        setUpCountries();
    }

    async function setUpCountries() {
        let visited = new Map()
        let startNodeID = undefined
        let finishNodeID = undefined
        let selectedNodeID = undefined
        //set upp more bodies
        const euCountries = await countries().getEUCountries()
        euCountries.forEach(country => {
            const nodeIDA = country.alpha3Code
            const multipleNodeID = country.borders
            addNode(nodeIDA)
            addMultipleEdges(nodeIDA, multipleNodeID)
        })
        // selectNode('AUT', selectedNodeID)
        // setVisited('SWE', visited)
        // setVisited('FIN', visited)
        // setStart('NOR', startNodeID)
        // setFinish('BLR', finishNodeID)
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

    class Node {
        constructor(nodeBody, neighbours){
            this.nodeBody = nodeBody;
            this.neighbours = neighbours;
            this.prevColor = undefined;
            this.currentColor = defaultColor;
        }

        setCurrentColor(color) {
            this.nodeBody.render.fillStyle = color
            this.nodeBody.render.strokeStyle = color

            this.prevColor = this.currentColor
            this.currentColor = color
        }

        setToOldColor(){
            this.nodeBody.render.fillStyle = this.prevColor
            this.nodeBody.render.strokeStyle = this.prevColor

            let currentColor = this.currentColor;
            this.currentColor = this.prevColor
            this.prevColor = currentColor;
        }

        addNeighbour(nodeID) {
            this.neighbours.push(nodeID)
        }

        getNeighbours() {
            return this.neighbours;
        }

        getBody() {
            return this.nodeBody;
        }

        //addEdge
    }

    function addNode(id, radius = defaultRadius) {
        //error handling
        if(nodes.get(id))
            return
            //return console.log('tried to add new node for already existing nodeID: ', id)

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
        //creating nodeBody
        let nodeBody = Bodies.circle(pos.x, pos.y, radius, options);
        //Add to world engine
        World.add(engine.world, nodeBody);
        //add empty neighbours
        let neighbours = []

        let node = new Node(nodeBody, neighbours)
        nodes.set(id, node)
    }

    function addEdge(nodeIDA, nodeIDB, length = defaultEdgeLength) {
        let nodeA = nodes.get(nodeIDA)
        let nodeB = nodes.get(nodeIDB)

        //error case
        if(!nodeA || !nodeB) {
            if(!nodeA) {
                addNode(nodeIDA)
                nodeA = nodes.get(nodeIDA)
            }
            if(!nodeB) {
                addNode(nodeIDB)
                nodeB = nodes.get(nodeIDB)
            }
        }
        //Add constraint and put in world
        let constrainOptions = {
            length: length,
            damping: 0.1,
            stiffness: 0.01
        }
        //Put edge object in array for body and neighbours
        let constraint = createConstraint(nodeA.getBody(), nodeB.getBody(), constrainOptions)
        //TODO - add sorting for this
        let edgeID = nodeIDA+nodeIDB;
        edgesBodies.set(edgeID, constraint)
        edges.set(edgeID, [nodeIDA, nodeIDB])

        //setting neighbours for nodes
        nodeA.addNeighbour(nodeIDB)
        nodeB.addNeighbour(nodeIDA)
    }

    function addMultipleEdges(nodeIDA, multipleNodeID, length = 100) {
        multipleNodeID.forEach(nodeIDB => {
            addEdge(nodeIDA, nodeIDB, length)
        })
    }

    function setVisited(nodeID, visited) {
        visited.set(nodeID, true)
    }

  
    function selectNode(nodeID, selectedNode) {
        changeColor(nodeID, selectedNode, selectColor)
    }

    function setStart(nodeID, startNode) {
        changeColor(nodeID, startNode, startColor)
    }

    function setFinish(nodeID, finishNode) {
        changeColor(nodeID, finishNode, finishColor)
    }

    function setPath(pathArr){
        pathArr.forEach(nodeID => {
            let node = nodes.get(nodeID)
            node.setCurrentColor(pathColor)
        })
    }

    function changeColor(nodeID, valToModify, color) {
        const node = nodes.get(nodeID)
        if(!node)
            return console.error("Couldn't change Color - No nodeID found")

        //set selected variable to node and get the prev
        const prevSelectedID = valToModify;
        valToModify = nodeID;

        //change color on newly selected node.
        node.setCurrentColor(color)

        //Change back color of prev selected node
        const prevNode = nodes.get(prevSelectedID)
        if(!prevNode)
            return console.error("Couldn't change Color - No nodeID found")
        prevNode.setToOldColor()
    }

    function setInQueueColor(nodeID) {
        const node = nodes.get(nodeID)
        if(!node)
            return console.error("Couldn't set in queue Color - No nodeID found")
        node.setCurrentColor(inQueueColor)
    }

    function setVisitedColor(node) {
        node.setCurrentColor(visitedColor)
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

    function getNode(nodeID) {
        let node = nodes.get(nodeID)
        if(!node)
            return console.error("Could not find node")
        return node
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

    function setStaticNode(nodeID) {
        const node = nodes.get(nodeID)
        if (!node)
            return console.log("couldnät set static node - no node found with id:", nodeID)
        node.getBody().isStatic = true;
    }

    return {
        setUp,
        addNode,
        getNode,
        addEdge,
        addMultipleEdges,
        selectNode,
        setStart,
        setFinish,
        setPath,
        setVisited,
        setVisitedColor,
        setInQueueColor,
        setStaticNode,
    }
}

export default Graph;