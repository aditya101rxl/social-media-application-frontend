import React from 'react'
import { Grid } from '@material-ui/core';
import { Avatar, IconButton, Paper, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { useStyles } from './style';
import { useHistory } from 'react-router-dom'

export const CommentDialogBox = ({ setOpenComment, post }) => {
    const classes = useStyles()
    const history = useHistory();

    return (
        <Grid container spacing={0}>
            <Grid item xs={12} sm={8}>
                <Paper variant='outlined'>
                    <img src={post.file} />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper variant='outlined'>
                    <div className={classes.head}>
                        <div style={{ display: 'flex' }}>
                            <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => history.push(`/user/profile/${post.username}`)}>
                                <Avatar aria-label="recipe" className={classes.avatar} src={post.profilePicture}>
                                    {post.name.charAt(0)}
                                </Avatar>
                            </IconButton>
                            <Typography className={classes.user_dialog} style={{ marginTop: '12px' }} variant='h6'>{post.username}</Typography>
                        </div>
                        <IconButton size='large' onClick={() => setOpenComment(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </Paper>
                <Paper variant='outlined'>
                    {post.comments.map(cmt => (
                        <Paper variant='outlined'>
                            <Typography variant='inherit'>{JSON.parse(cmt).username} &nbsp;</Typography>
                            <Typography variant='inherit'>{JSON.parse(cmt).comment}</Typography>
                        </Paper>
                    ))}
                </Paper>
            </Grid>
        </Grid>
    )
}
