import Matter from 'matter-js/build/matter'
import MatterAttractors from 'matter-attractors'

function Graph(ref, width, height) {
    Matter.use(MatterAttractors);

    let Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Composite = Matter.Composite,
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

    let defaultNodeRadius = 10,
        defaultEdgeLength = 50,
        stiffness = 0.005,
        damping = 0.1;

    var nodes = new Map()
    let engine = setUpEngine()
    let render = setUpRender()
    let graph = Composite.create()
    let hoveredNode = {label: "undefied"}

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
                wireframes: false,
                hasZIndex: false,
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
        World.add(engine.world, graph)
    }

    function setUp() {
        /** 
         *  gravity of -5.5 - stable fast, but very powerful beginning movements if starting at same pos. Removed powerful with random startpos
         *  gravity of -3.5 might be a bit stiff, but still not to wiggly
         *  gravity of -2.5 Feels a bit to wiggly. Wiggles a long time
        */
        engine.world.gravity.y = 0;
        MatterAttractors.Attractors.gravityConstant = -7.5;
        stiffness = 0.005
        damping = 0.1

        setUpBorders();
        addMouseConstrain();
    }

    class Node {
        constructor(id, nodeBody, neighbours, details = {}){
            this.id = id;
            this.details = details;
            this.nodeBody = nodeBody;
            this.neighbours = neighbours;
            this.prevColor = defaultColor;
            this.currentColor = defaultColor;
        }

        setDetails(details){
            let oldDetails = this.details;
            this.details = {...oldDetails, ...details}
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

        resetColors(){
            this.currentColor = defaultColor;
            this.setCurrentColor(defaultColor)
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

    }

    function addNode(id, radius = defaultNodeRadius, details = {}) {
        //error handling - if already created
        let node = nodes.get(id);
        if(node) {
            //add Node information
            node.setDetails(details)
            return
        }
            

        //Create node body
        let margin = 0.1
        let pos = {
            x: (Math.random() * (1-margin*2) + margin) * width,
            y: (Math.random() * (1-margin*2) + margin) * height
        }
        let options = {
            label: id,
            render: {
                fillStyle: defaultColor,
                strokeStyle: defaultColor,
                lineWidth: 3,
                zIndex: 500,
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
        Composite.add(graph, nodeBody);
        //add empty neighbours
        let neighbours = []

        node = new Node(id, nodeBody, neighbours, details)
        nodes.set(id, node)
    }

    function addEdge(nodeIDA, nodeIDB, length = defaultEdgeLength) {
        let nodeA = nodes.get(nodeIDA)
        let nodeB = nodes.get(nodeIDB)

        //error case
        if(!nodeA || !nodeB) {
            let details = {
                name: "Outside region"
            }
            if(!nodeA) {
                details.name = nodeIDA + " - " +  details.name
                addNode(nodeIDA, undefined, details)
                nodeA = nodes.get(nodeIDA)
            }
            if(!nodeB) {
                details.name = nodeIDB + " - " + details.name
                addNode(nodeIDB, undefined, details)
                nodeB = nodes.get(nodeIDB)
            }
        }
        //Add constraint and put in world
        let constrainOptions = {
            length: length,
            damping: damping,
            stiffness: stiffness
        }
        //Put edge object in array for body and neighbours, added to graph composite
        createConstraint(nodeA.getBody(), nodeB.getBody(), constrainOptions)

        //setting neighbours for nodes
        nodeA.addNeighbour(nodeIDB)
        nodeB.addNeighbour(nodeIDA)
    }

    function addMultipleEdges(nodeIDA, multipleNodeID, length = defaultEdgeLength) {
        multipleNodeID.forEach(nodeIDB => {
            addEdge(nodeIDA, nodeIDB, length)
        })
    }

    function reset() {
        for(let node of nodes.values()){
            node.resetColors()
        }
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

    function setNodeRadius(radius){
        defaultNodeRadius = radius;
    }

    function setEdgeLength(length){
        defaultEdgeLength = length;
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
            return console.error("Tried to change Color on non existing NodeID")

        //set selected variable to node and get the prev
        const prevSelectedID = valToModify;
        valToModify = nodeID;

        //change color on newly selected node.
        node.setCurrentColor(color)

        //Change back color of prev selected node
        const prevNode = nodes.get(prevSelectedID)
        if(prevNode)
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

    function calcSetNodeEdgeSize(dataLength){
        let boxHeight = calcBoxSize(dataLength)
        let edgeToNodeSize = 4;
        let nodeLength = Math.ceil(boxHeight / (edgeToNodeSize + 1))
        let edgeLength = Math.ceil(nodeLength * edgeToNodeSize)
        console.log("Nodelength: ", nodeLength)
        console.log("edgeLength: ", edgeLength)

        console.log("Calculated node size")
        this.setNodeRadius(nodeLength / 2)
        this.setEdgeLength(edgeLength)
        console.log("set sizes for datalength ", dataLength)
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

    async function setNewGraphData(newData, addDataToGraph, startNodeID, endNodeID){
        console.log("clearing all nodes")
        //Clear old stuff - could be added to history in future
        Composite.clear(graph, false)
        nodes.clear()

        //add new stuff
        await addDataToGraph(newData, this)
        this.setStart(startNodeID)
        this.setFinish(endNodeID)
    }

    function getAllNodeID(){
        return [...nodes.keys()]
    }

    function createConstraint(bodyA, bodyB, options) {
        //TODO - looks so theres no already exisitng
        let optionsObj = {bodyA, bodyB, ...options}
        let constraint = Constraint.create(optionsObj)
        constraint.render.type = 'line';
        constraint.render.anchors = false;
        Composite.add(graph, constraint);
        return constraint
    }

    function getNode(nodeID) {
        let node = nodes.get(nodeID)
        if(!node)
            return console.error("Could not find node")
        return node
    }

    function run() {
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

        addNodeHoverEvent(mouseConstraint)
    }

    function addNodeHoverEvent(mouseConstraint){
        //Add event with 'mousemove'
        Matter.Events.on(mouseConstraint, 'mousemove', (event) => {
            //For Matter.Query.point pass "array of bodies" and "mouse position"
            var foundPhysics = Matter.Query.point(Composite.allBodies(graph), event.mouse.position);
        
            //Your custom code here
            let foundNodeBody = foundPhysics[0];
            if(typeof foundNodeBody !== "undefined"){
                if(foundNodeBody.label !== hoveredNode){
                    //TODO - add this.props.handle
                    let nodeID = foundNodeBody.label
                    onNodeHover(nodeID)
                }
                hoveredNode = foundNodeBody.label;
            }
        });
    }

    function onNodeHover(nodeID){
        //console.log("onNodeHover for node: ", node)
        let node = nodes.get(nodeID)
        if(!node)
            return
        var event = new CustomEvent('onNodeHover', {
            detail: {node}
        });
        ref.current.dispatchEvent(event);
    }

    function setStaticNode(nodeID) {
        const node = nodes.get(nodeID)
        if (!node)
            return console.log("couldnät set static node - no node found with id:", nodeID)
        node.getBody().isStatic = true;
    }

    return {
        setUp,
        run,
        reset,
        addNode,
        getNode,
        addEdge,
        addMultipleEdges,
        selectNode,
        setStart,
        setFinish,
        setPath,
        setNewGraphData,
        setVisited,
        setVisitedColor,
        setInQueueColor,
        setStaticNode,
        setNodeRadius,
        setEdgeLength,
        calcSetNodeEdgeSize,
        getAllNodeID,
    }
}

export default Graph;