import Matter from 'matter-js'
import MatterAttractors from 'matter-attractors'

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
        visitedColor = 'red';

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

    function setUp() {
        /** 
         *  gravity of -5.5 - stable fast, but very powerful beginning movements if starting at same pos
         *  gravity of -3.5 might be a bit stiff, but still not to wiggly
         *  gravity of -2.5 Feels a bit to wiggly. Wiggles a long time
        */
        engine.world.gravity.y = 0;
        MatterAttractors.Attractors.gravityConstant = -5.5;

        setUpTestBodies();
        addMouseConstrain();
        runEngineAndRender()
    }

    function addNode(id) {
        //add empty neighbours
        let neighbours = []
        nodesNeighbours.set(id, neighbours)

        //Create node body
        let pos = {
            x: 450,
            y: 250
        }
        let radius = 20
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

    function addEdge(nodeIDA, nodeIDB) {
        let nodeBodyA = nodesBodies.get(nodeIDA)
        let nodeBodyB = nodesBodies.get(nodeIDB)

        //error case
        if(!nodeBodyA || ! nodeBodyB) {
            return console.error("couldn't find nodeID for either " + nodeIDA + " or " + nodeIDB)
        };

        //Add constraint and put in world
        let constrainOptions = {
            length: 100,
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
        //Get node body and neighbours
        const {nodeBody, ...other} = getNode(nodeID)
        //set selected variable to node and get the prev
        const prevSelectedID = selectedNode
        selectedNode = nodeID

        //change color on newly selected node.
        setColor(nodeBody, selectColor)

        //Change back color of prev selected node
        const prevNode = getNode(prevSelectedID)
        if(!prevNode.nodeBody) return
        setColor(prevNode.nodeBody, defaultColor)
    }

    function setStart(nodeId) {
        //TODO - fix start
    }

    function setFinish(nodeId) {
        //TODO - fix start
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
        selectNode,
        addNodeToVisited,
        setStaticNode,
    }
}

export default Graph;