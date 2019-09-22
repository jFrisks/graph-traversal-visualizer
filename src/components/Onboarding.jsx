import React, {useState} from 'react'
import { DialogTitle, Dialog, Avatar, ListItemText, DialogContent, DialogContentText, DialogActions, Button, ListItem, List } from '@material-ui/core';

export default function OnboardingDialog(props) {
    const [open, setOpen] = useState(true);

    function handleClose() {
        setOpen(false)
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="welcome-title">Welcome to Graph Traversal Visualizer!</DialogTitle>
            <DialogContent>
                <DialogContentText id="project-description">
                    Welcome to my (jFrisks) project - a graph traversal visualizer with floating nodes and edges.
                    You can play around with various World Maps and see country name and their neighbouring countries.
                </DialogContentText>
                <List>
                    <ListItem><ListItemText primary="Select a graph from buttons on the right side."/></ListItem>
                    <ListItem><ListItemText primary="You can hover on a node to see which country you are looking at"/></ListItem>
                    <ListItem><ListItemText primary="Select starting node for traversals, and also ending node if you want to use shortest paths algos."/></ListItem>
                    <ListItem><ListItemText primary="You can change speed of the algo with the selector"/></ListItem>
                    <ListItem><ListItemText primary="You can click on an algo button to run"/></ListItem>
                </List>
                <DialogContentText id="future-description">
                    Project is still running. Some bugs and a lot of features that could be even better!
                    I will implement more algos, more beautiful visualization, my own physics engine, error console handling, more ...
                    {`//Jonathan Frisk (jFrisks)`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Okay
                </Button>
            </DialogActions>
        </Dialog>
    );
}