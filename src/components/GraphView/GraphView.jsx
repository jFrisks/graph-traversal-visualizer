import React from 'react'
import styled from 'styled-components'

import Matter from 'matter-js'
import Graph from './Graph'
import Algorithms from '../Algorithms'

import countries from '../../data/countries'

const Wrapper = styled.div`
    position: relative;
`
const Menu = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 7%;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    width: 50vw;
    justify-content: center;
`

const Button = styled.button`
    background-color:#44c767;
	-moz-border-radius:28px;
	-webkit-border-radius:28px;
	border-radius:28px;
	border:1px solid #18ab29;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:17px;
	padding:16px 31px;
	text-decoration:none;
	text-shadow:0px 1px 0px #2f6627;
`


class GraphView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            Graph: undefined,
            algoRunning: false
        }
        this.scene = React.createRef();
    }

    componentDidMount() {
        //set upp render - after that set up everything else
        const newGraph = Graph(this.scene, this.props.width, this.props.height)
        this.setState({
            Graph: newGraph
        }, () => {
            this.state.Graph.setUp()
        })
        
    }

    handleBFTClick() {
        const algo = () => Algorithms(this.state.Graph).bfs('SWE')
        this.runAlgo(algo)
    }

    handleBFSClick() {
        const algo = () => Algorithms(this.state.Graph).bfs('SWE', 'TUR')
        this.runAlgo(algo)
    }

    handleDFSClick() {
        const algo = () => Algorithms(this.state.Graph).dfs('SWE')
        this.runAlgo(algo)
    }

    async runAlgo(algo) {
        if(this.state.algoRunning)
            return console.log("algo already running")

        this.setState({algoRunning: true})
        await algo()
        this.setState({algoRunning: false})
    }

    
    render() {
        return (
            <Wrapper>
                <div className="graphView" ref={this.scene}>
                    <Menu>
                        <Button onClick={() => this.handleBFTClick()}>
                            START BFT
                        </Button>
                        <Button onClick={() => this.handleBFSClick()}>
                            START BFS
                        </Button>
                        <Button onClick={() => this.handleDFSClick()}>
                            START DFT
                        </Button>
                    </Menu>
                </div>
            </Wrapper>
        )
    }
}


export default GraphView;