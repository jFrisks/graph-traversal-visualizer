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

const RedButton = styled(Button)`
    background-color:#EA3C3C;
    text-shadow:0px 1px 0px rgba(35,35,35,0.72);
    border:1px solid rgba(35,35,35,0.72);
`

function Selector(props) {
    const { data, value, onChange, ...other } = props;

    return (
        <select value={value} onChange={onChange}>
            {data.map((option, index) => (
                <option key={option+index} value={option}>{option}</option>
            ))}
        </select>
    )
}

let data = ['SWE', 'BLR', 'TUR', 'DEU']
let speedSteps = [50, 100, 500, 1000, 2000]

class GraphView extends React.Component{
    

    constructor(props) {
        super(props);
        this.state = {
            Graph: undefined,
            algoRunning: false,
            startNode: data[0],
            endNode: data[1],
            speed: speedSteps[3]
        }
        this.scene = React.createRef();
        this.handleSelectChange = this.handleSelectChange.bind(this);
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

    handleSelectChange(event, stateVar) {
        this.setState({[stateVar]: event.target.value})
    }

    handleBFTClick() {
        const algo = () => Algorithms(this.state.Graph, this.state.speed).bfs(this.state.startNode)
        this.runAlgo(algo)
    }

    handleBFSClick() {
        const algo = () => Algorithms(this.state.Graph, this.state.speed).bfs(this.state.startNode, this.state.endNode)
        this.runAlgo(algo)
    }

    handleDFSClick() {
        const algo = () => Algorithms(this.state.Graph, this.state.speed).dfs(this.state.startNode)
        this.runAlgo(algo)
    }

    handleReset() {
        const resetFunc = () => new Promise(res => {
            console.log("resetting colors")
            this.state.Graph.reset()
            res()
        })
        this.runAlgo(resetFunc)
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
                        <RedButton onClick={() => this.handleReset()}>
                            Reset
                        </RedButton>
                        <Selector data={data} value={this.state.startNode} onChange={(e) => this.handleSelectChange(e, 'startNode')}/>
                        <Selector data={data} value={this.state.endNode} onChange={(e) => this.handleSelectChange(e, 'endNode')}/>
                        <Selector data={speedSteps} value={this.state.speed} onChange={(e) => this.handleSelectChange(e, 'speed')}/>
                    </Menu>
                </div>
            </Wrapper>
        )
    }
}


export default GraphView;