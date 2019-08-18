import React from 'react'

import Matter from 'matter-js'
import Graph from './Graph'

class GraphView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            Graph: undefined
        }
        this.scene = React.createRef();
    }

    componentDidMount() {
        //set upp render - after that set up everything else
        let newGraph = Graph(this.scene, this.props.width, this.props.height)
        this.setState({
            Graph: newGraph
        }, () => {
            this.state.Graph.setUp()
            this.setUpBodies()
        })
        
    }
    
    setUpBodies() {
        //set upp more bodies
        this.state.Graph.setStaticNode('K')
    }

    render() {
        return (
            <div ref={this.scene} />
        )
    }
}

export default GraphView;