import Matter from 'matter-js'

export default function GraphEngine(sceneRef, height = 600, width = 600) {
    // module aliases
    let Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create an engine
    let engine = Engine.create();

    // create a renderer
    let render = Render.create({
        element: sceneRef,
        engine: engine,
        options: {
            width: height,
            height: width,
        }
    });

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    World.add(engine.world, [boxA, boxB, ground]);

    // run the engine
    Engine.run(engine);

    Render.run(render);    
}