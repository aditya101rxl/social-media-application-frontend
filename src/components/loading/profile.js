import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, GridListTile, GridList } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    card: {
        width: 'lg',
        margin: theme.spacing(2),
    },
    media: {
        height: 400,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        padding: theme.spacing(1),
    },
}));

function Media() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                    <div>
                        <Skeleton animation="wave" variant="circle" width={300} height={300} />
                        <Skeleton animation="wave" height={60} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <div className={classes.header}>
                        <Skeleton animation="wave" width={400} height={60} />
                        <Skeleton animation="wave" width={200} height={60} />
                    </div>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <div className={classes.header}>
                                <Skeleton animation="wave" width={100} height={60} />
                                <Skeleton animation="wave" width={100} height={60} />
                            </div>
                        </Grid>
                        <Grid item xs>
                            <div className={classes.header}>
                                <Skeleton animation="wave" width={100} height={60} />
                                <Skeleton animation="wave" width={100} height={60} />
                            </div>
                        </Grid>
                        <Grid item xs>
                            <div className={classes.header}>
                                <Skeleton animation="wave" width={100} height={60} />
                                <Skeleton animation="wave" width={100} height={60} />
                            </div>
                        </Grid>
                    </Grid>
                    <div className={classes.header}>
                        <Skeleton animation="wave" width={500} height={60} />
                        <Skeleton animation="wave" width={500} height={60} />
                    </div>
                </Grid>
            </Grid>
            <div className={classes.root1}>
                <GridList cellHeight={250} cols={3}>
                    <GridListTile key='12323'>
                        <Skeleton variant="rect" width={300} height={300} />
                    </GridListTile>
                    <GridListTile key='12323143'>
                        <Skeleton variant="rect" width={300} height={300} />
                    </GridListTile>
                    <GridListTile key='12323123'>
                        <Skeleton variant="rect" width={300} height={300} />
                    </GridListTile>
                </GridList>
            </div>
        </div>
    )
}

Media.propTypes = {
    loading: PropTypes.bool,
};

export const LoadingProfile = () => {
    // console.log('loading....');
    return (
        <Media />
    );
}