import React from 'react'
import { Button, Snackbar } from '@material-ui/core';


export default function SnackbarLayout(props) {
    const queueRef = React.useRef([]);
    const [open, setOpen] = React.useState(false);
    const [messageInfo, setMessageInfo] = React.useState(undefined);
  
    const processQueue = () => {
      if (queueRef.current.length > 0) {
        setMessageInfo(queueRef.current.shift());
        setOpen(true);
      }
    };
  
    const handleClick = message => () => {
      queueRef.current.push({
        message,
        key: new Date().getTime(),
      });
  
      if (open) {
        // immediately begin dismissing current message
        // to start showing new one
        setOpen(false);
      } else {
        processQueue();
      }
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  
    const handleExited = () => {
      processQueue();
    };

    return (
      <>
        {props.children}
        <Snackbar
          key={messageInfo ? messageInfo.key : undefined}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          onExited={handleExited}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{messageInfo ? messageInfo.message : undefined}</span>}
        />
      </>
    );
  }