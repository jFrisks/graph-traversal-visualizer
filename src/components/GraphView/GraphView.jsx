import React from 'react'

import Matter from 'matter-js'

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

//nodesNeighbours: id -> [...nodeIDS]
var nodesNeighbours = new Map()
//nodesBodies: id -> matter body
var nodesBodies = new Map()
//edges: id -> [nodeIDA, nodeIDB]
var edges = new Map()
//edgesBodies: id -> constraint
var edgesBodies = new Map()

var visitedNodes = new Map()



class GraphView extends React.Component{

    constructor(props) {
        super(props);
        
        this.state = {
            engine: Engine.create(),
            render: undefined
        }

        this.scene = React.createRef();
    }

    componentDidMount() {
         // module aliases
        // create an engine

        // create a renderer
        var render = Render.create({
            element: this.scene.current,
            engine: this.state.engine,
            options: {
                width: this.props.width,
                height: this.props.height,
                wireframes: false
            }
        });
        this.setState({render}, () => {
            this.setUpBodies();
            this.addMouseConstrain();
            this.runEngineAndRender()
        })  
    }
    
    setUpBodies() {
        //Create Ground and surrounding
        var ground = Bodies.rectangle(400, 400, 810, 20, { isStatic: true });
        World.add(this.state.engine.world, ground);

        //Here should be the reading of graph from file or data

        this.addNode('A')
        this.addNode('B')
        this.addNode('C')
        this.addNode('D')
        this.addNode('E')
        this.addNode('F')
        this.addNode('G')
        this.addNode('H')
    
        this.addEdge('A', 'B')
        this.addEdge('A', 'C')
        this.addEdge('B', 'C')
        this.addEdge('A', 'D')
        this.addEdge('A', 'E')
        this.addEdge('B', 'F')
        this.addEdge('B', 'G')
        this.addEdge('B', 'H')

        this.addNodeToVisited('A')
        setTimeout(() => this.addNodeToVisited('B'), 2000)
        console.log(visitedNodes)
    }

    addNode(id) {
        //add empty neighbours
        let neighbours = []
        nodesNeighbours.set(id, neighbours)

        //Create node body
        let color = 'blue'
        let options = {
            render: {
                fillStyle: color,
                strokeStyle: color,
                lineWidth: 3
           }
        }
        let node = Bodies.circle(350, 50, 20, options);
        nodesBodies.set(id, node)

        //Add to world engine
        World.add(this.state.engine.world, node);
    }

    addEdge(nodeIDA, nodeIDB) {
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
        let constraint = this.createConstraint(nodeBodyA, nodeBodyB, constrainOptions)
        //TODO - add sorting for this
        let edgeID = nodeIDA+nodeIDB;
        edgesBodies.set(edgeID, constraint)
        edges.set(edgeID, [nodeIDA, nodeIDB])
    }

    addNodeToVisited(nodeID) {
        let nodeBody = nodesBodies.get(nodeID)
        let nodeNeighbours = nodesNeighbours.get(nodeID)

        //error
        if(!nodeBody || !nodeNeighbours) {
            return console.error("nodebody and/or nodeNeighbours not found for nodeID:", nodeID)
        }

        //add to array
        visitedNodes.set(nodeID, nodeNeighbours)
        //set specific color for visited nodes
        nodeBody.render.fillStyle = 'red'
        nodeBody.render.strokeStyle = 'red'
    }


    createConstraint(bodyA, bodyB, options) {
        //TODO - looks so theres no already exisitng
        let optionsObj = {bodyA, bodyB, ...options}
        let constraint = Constraint.create(optionsObj)
        constraint.render.type = 'line';
        constraint.render.anchors = false;
        World.add(this.state.engine.world, constraint);
        return constraint
    }

    runEngineAndRender() {
        // run the engine
        Engine.run(this.state.engine);
        Render.run(this.state.render);  
    }

    addMouseConstrain() {
        // add mouse control
        var mouse = Mouse.create(this.state.render.canvas),
        mouseConstraint = MouseConstraint.create(this.state.engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                visible: false
                }
            }
            });
        World.add(this.state.engine.world, mouseConstraint);
    }

    render() {
        return (
            <div ref={this.scene} />
        )
    }
}

export default GraphView;