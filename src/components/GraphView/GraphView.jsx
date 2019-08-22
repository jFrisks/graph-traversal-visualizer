import React from 'react'
import styled from 'styled-components'

import Graphs from './Graphs'
import Algorithms from '../Algorithms'
import countries from '../../data/countries'

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Paper, Snackbar } from '@material-ui/core';

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
    flex-wrap: wrap;
    width: 93vw;
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

function Selector2(props) {
    const { data, value, onChange, typeName, ...other } = props;

    return(
        <FormControl>
            <InputLabel htmlFor="age-simple">{typeName}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
                inputProps={{
                name: typeName,
                id: typeName,
                }}
            >
                {data.map((option, index) => (
                    <MenuItem key={option+index} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

let speedSteps = [50, 100, 500, 1000, 2000]

class GraphView extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            Graph: undefined,
            graphNodes: [],
            algoRunning: false,
            startNode: "Choose",
            endNode: "Choose",
            speed: speedSteps[3],
            selectedNode: undefined,
            hoverQueue: [],
            hoverOpen: false,
            hoverMessage: undefined,
        }
        this.scene = React.createRef();
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleNodeHover = this.handleNodeHover.bind(this);
    }

    componentDidMount() {
        //set upp render - after that set up everything else
        Graphs(this.scene, this.props.width, this.props.height).WorldGraph()
            .then(newGraph => {
                let allNodeID = newGraph.getAllNodeID()
                this.setState({
                    Graph: newGraph,
                    graphNodes: allNodeID,
                    startNode: allNodeID[0],
                    endNode: allNodeID[0]
                })
            })
        this.scene.current.addEventListener('onNodeHover', this.handleNodeHover);
    }
  
    setHoverMessage = (hoverMessage) => {
        this.setState({hoverMessage})
    }

    setHoverOpen = (hoverOpen) => {
        this.setState({hoverOpen})
    }
    
    processHoverMessageQueue = () => {
      if (this.state.hoverQueue.length > 0) {
        this.setHoverMessage(this.state.hoverQueue.shift());
        this.setHoverOpen(true);
      }
    };
  
    sendHoverMessage = message => {
        this.state.hoverQueue.push({
            message,
            key: new Date().getTime(),
        });
    
        if (this.state.hoverOpen) {
            // immediately begin dismissing current message
            // to start showing new one
            this.setHoverOpen(false);
        } else {
            this.processHoverMessageQueue();
        }
    };
  
    handleHoverClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setHoverOpen(false);
    };
  
    handleHoverExited = () => {
      this.processHoverMessageQueue();
    };


    handleSelectChange(event, stateVar) {
        //TODO -Set new nodecolors
        // this.state.Graph.setStart()
        // this.state.Graph.setFinish()

        this.setState({[stateVar]: event.target.value})
    }

    handleNodeHover(event) {
        //Get node id
        let node = event.detail.node
        this.sendHoverMessage(node.details.name)
        this.setState({selectedNode: node})
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

    async handleGraphChange(region) {
        if(this.state.algoRunning)
            return this.sendHoverMessage('You can only change graph when algo is not running')
        let data;
        switch(region){
            case 'eu':
                data = await countries().getEUCountries()
                break;
            case 'world':
                data = await countries().getWorldCountries()
                break;
            case 'africa':
                data = await countries().getAfricaCountries()
                break;
            default:
                data = await countries().getWorldCountries()
        }
        let addCountriesToDataFunc = Graphs(this.scene, this.props.width, this.props.height).addCountriesToGraph
        this.state.Graph.setNewGraphData(data, addCountriesToDataFunc, this.state.startNode, this.state.endNode)
        let allNodeID = this.state.Graph.getAllNodeID()
        this.setState(prev => ({
            graphNodes: allNodeID,
            startNode: prev.startNode,
            endNode: prev.endNode
        }))
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
            return this.sendHoverMessage('SLOW DOWN - Algo already running')

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
                        <Paper>
                            <Selector2 data={this.state.graphNodes} typeName="Start Node" value={this.state.startNode} onChange={(e) => this.handleSelectChange(e, 'startNode')}/>
                            <Selector2 data={this.state.graphNodes} typeName="End Node" value={this.state.endNode} onChange={(e) => this.handleSelectChange(e, 'endNode')}/>
                            <Selector2 data={speedSteps} typeName="Algo Speed" value={this.state.speed} onChange={(e) => this.handleSelectChange(e, 'speed')}/>
                        </Paper>
                        
                        <Button onClick={() => this.handleGraphChange('eu')}>
                            EU Graph
                        </Button>
                        <Button onClick={() => this.handleGraphChange('world')}>
                            World Graph
                        </Button>
                        <Button onClick={() => this.handleGraphChange('africa')}>
                            Africa Graph
                        </Button>
                    </Menu>
                    <Snackbar
                        key={this.state.hoverMessage ? this.state.hoverMessage.key : undefined}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={this.state.hoverOpen}
                        autoHideDuration={2000}
                        onClose={this.handleHoverClose}
                        onExited={this.handleHoverExited}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.hoverMessage ? this.state.hoverMessage.message : undefined}</span>}
                    />
                </div>
            </Wrapper>
        )
    }
}


export default GraphView;