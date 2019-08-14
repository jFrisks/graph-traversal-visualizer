import React from 'react'

import Matter from 'matter-js'

import GraphEngine from './graphengine'

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;


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

        // create shapes
        var nodeA = Bodies.circle(350, 50, 20);
        var nodeB = Bodies.circle(350, 50, 20);
        var nodeC = Bodies.circle(350, 50, 20);
        var nodeD = Bodies.circle(350, 50, 30);
        var nodeE = Bodies.circle(350, 50, 30);
        var nodeF = Bodies.circle(350, 50, 30);
        

        // add all of the Bodies to the world
        World.add(this.state.engine.world, [nodeA, nodeB, nodeC, nodeD, nodeE, nodeF, ground]);

        var constrainOptions = {
            length: 100,
            damping: 0.1,
            stiffness: 0.01
        }
        this.createConstraint(nodeA, nodeB, constrainOptions)
        this.createConstraint(nodeA, nodeC, constrainOptions)
        this.createConstraint(nodeB, nodeC, constrainOptions)
        this.createConstraint(nodeA, nodeD, constrainOptions)
        this.createConstraint(nodeA, nodeE, constrainOptions)
        this.createConstraint(nodeB, nodeF, constrainOptions)
    }

    createConstraint(bodyA, bodyB, options) {
        let optionsObj = {bodyA, bodyB, ...options}
        let constraint = Constraint.create(optionsObj)
        constraint.render.type = 'line';
        constraint.render.anchors = false;
        World.add(this.state.engine.world, constraint);
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