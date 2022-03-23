import React, { useContext, useEffect, useState } from 'react'
import { Grid, Box } from '@material-ui/core'
import { Feeds } from './feeds/Feeds';
import { Profile } from './profile/Profile'
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../../context/global/GlobalStates'
import { LoadingFeed } from '../loading/home'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from 'react-bootstrap/Spinner';


const useStyles = makeStyles((theme) => ({
    sectionMobile: {
        // display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    scrollbar: {
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    }
}));

export const Home = () => {

    document.title = 'Home'
    const classes = useStyles();
    const { posts, hasMore, getPosts } = useContext(GlobalContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const fetchMoreData = () => { getPosts(); };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
                <Box component="div" style={{ marginTop: '5px' }} className={classes.scrollbar}>
                    {posts.length === 0 && <><LoadingFeed /><LoadingFeed/></>}
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<>
                        <Spinner></Spinner>
                            <Spinner animation="grow" variant="primary" style={{margin: '3%'}}/>
                            <Spinner animation="grow" variant="secondary" style={{margin: '3%'}}/>
                            <Spinner animation="grow" variant="success" style={{margin: '3%'}}/>
                            <Spinner animation="grow" variant="danger" style={{margin: '3%'}}/>
                            <Spinner animation="grow" variant="warning" style={{margin: '3%'}}/>
                            <Spinner animation="grow" variant="info" style={{margin: '3%'}}/>
                        </>}
                    >
                        {posts.map(post => <Feeds post={post} />)}
                    </InfiniteScroll>
                </Box>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.sectionMobile}>
                <div style={{ height: '100%' }}>
                    <Profile />
                </div>
            </Grid>
        </Grid >
    )
}


