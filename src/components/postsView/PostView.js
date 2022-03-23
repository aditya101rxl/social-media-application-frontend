import React, { useContext, useEffect, useState } from 'react';

import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation, useParams } from 'react-router-dom'
import PropTypes from 'prop-types';
import * as api from '../../api'
import { Tab, Paper, Tabs, Box, Typography } from '@material-ui/core';
import { Feeds } from '../home/feeds/Feeds';
import CommentIcon from '@material-ui/icons/Comment';
import { GlobalContext } from '../../context/global/GlobalStates';
import { LoadingFeed } from '../loading/home';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} style={{ marginBottom: '25px' }} >
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    hover: {
        fontSize: '24px',
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
        }
    },
}));

export const PostView = () => {
    document.title = 'post view'
    const classes = useStyles();
    const params = useParams();
    const history = useHistory()
    const location = useLocation()
    const _id = params.id;
    const [post, setPost] = useState(0);
    const [value, setValue] = React.useState(0);
    const { user } = useContext(GlobalContext);

    // console.log(user);

    useEffect(async () => {
        const { data } = await api.findPost(_id);
        // console.log(data);
        setPost(data);
    }, [location])


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const Like = ({ likes }) => {
        return (
            likes.map(like => (
                <div>
                    <span
                        className={classes.hover}
                        onClick={() => history.push(`/user/profile/${like}`)}
                    >
                        {like === user?.username ? 'You' : like}
                    </span> liked this post
                </div>
            ))
        )
    }
    const Comment = ({ comments }) => {
        return (
            comments.map(cmt => (
                <div>
                    <span
                        className={classes.hover}
                        onClick={() => history.push(`/user/profile/${JSON.parse(cmt).username}`)}
                    >
                        {JSON.parse(cmt).username === user?.username ? 'You' : JSON.parse(cmt).username}
                    </span> commented on this post
                    < p > {JSON.parse(cmt).comment}</p >
                </div >
            ))
        )
    }

    if (post === 0) {
        return (
            <LoadingFeed />
        )
    }
    return (
        <>
            <Feeds post={post} />
            <Paper square className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="icon tabs example"
                >
                    <Tab icon={<FavoriteIcon />} aria-label="favorite" {...a11yProps(0)} />
                    <Tab icon={<CommentIcon />} aria-label="person" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Like likes={post.likes} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Comment comments={post.comments} />
                </TabPanel>
            </Paper>
        </>
    )
}
