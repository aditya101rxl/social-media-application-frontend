import React from 'react';
import { useStyles } from './style';
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export const Error = () => {
    const classes = useStyles();
    const history = useHistory()
    return (
        <div className={classes.error}>
            404 error page.
            <Button className={classes.btn} onClick={() => history.push('/')}>Go to home </Button>
        </div >
    );
}