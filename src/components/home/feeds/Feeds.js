import React, { useState, useContext } from 'react';

import moment from 'moment'
import { Paper, Card, CardHeader, CardContent, CardActions, Avatar, InputBase } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { useStyles } from './style'
import { Link, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { GlobalContext } from '../../../context/global/GlobalStates';
import { CommentDialogBox } from './CommentDialogBox';
import Slide from '@material-ui/core/Slide';
import { DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const Feeds = ({ post }) => {
    const classes = useStyles();
    const history = useHistory();
    const { user, like, dislike, commentPost, deletePost } = useContext(GlobalContext)
    const [openComment, setOpenComment] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openMore, setOpenMore] = useState(false);
    const isLogin = user === null

    const handleLike = async () => {
        if (user !== null && post.likes.indexOf(user.username) == -1) {
            post.likes.push(user.username);
            like({ data: post.likes, id: post._id, user: user.username });
        }
    }

    const handleDislike = async () => {
        post.likes.splice(post.likes.indexOf(user.username), 1);
        dislike({ data: post.likes, id: post._id, user: user.username });
    }

    const handleComment = (e) => {
        if (e.charCode === 13 && e.target.value.length > 0) {
            const cmnt = JSON.stringify({ username: user.username, comment: e.target.value });
            post.comments.push(cmnt)
            commentPost({ data: post.comments, comment: cmnt, id: post._id })
            e.target.value = ''
        }
    };

    const Like = () => {
        if (post.likes.length > 0) {
            return post.likes.find(like => like === user?.username) ? (
                <FavoriteIcon onClick={handleDislike} color='secondary' fontSize='large' />
            ) : (
                <FavoriteBorderIcon onClick={handleLike} fontSize='large' />
            )
        }
        return <FavoriteBorderIcon onClick={handleLike} fontSize='large' />
    }

    return (
        <Card className={classes.root} variant='outlined' >
            <CardHeader
                style={{ padding: '1px' }}
                avatar={
                    <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => history.push(`/user/profile/${post.username}`)}>
                        <Avatar aria-label="recipe" className={classes.avatar} src={post.profilePicture}>
                            {post.name.charAt(0)}
                        </Avatar>
                    </IconButton>
                }
                action={
                    <>
                        <IconButton disabled={isLogin} aria-label="settings" onClick={() => setOpenMore(true)}>
                            <MoreHorizIcon style={{ marginRight: '22px', marginTop: '12px', }} />
                        </IconButton>
                        <Dialog
                            open={openMore}
                            onClose={() => setOpenMore(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <Paper className={classes.dialog_paper}>
                                <Button style={{ padding: '10px' }} variant='outlined' onClick={() => history.push(`/post/postView/${post._id}`)}>Go To Post</Button>
                                <Button style={{ padding: '10px' }} variant='outlined'>Share</Button>
                                <Button style={{ padding: '10px' }} variant='outlined'>Copy link</Button>
                                {post.username === user?.username && (
                                    <>
                                        <Button style={{ padding: '10px', fontWeight: '600' }} variant='outlined' color='secondary' onClick={() => setOpenDelete(true)}>Delete Post</Button>
                                        <Dialog
                                            open={openDelete}
                                            TransitionComponent={Transition}
                                            keepMounted
                                            onClose={() => setOpenDelete(false)}
                                            aria-labelledby="alert-dialog-slide-title"
                                            aria-describedby="alert-dialog-slide-description"
                                        >
                                            <DialogTitle id="alert-dialog-slide-title">{"Delete this post"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-slide-description">
                                                    <p>
                                                        Once you delete your post, all user action related to this post get
                                                        deleted and can't be recovered.
                                                    </p>
                                                    <p>
                                                        Are you sure you want to delete your post
                                                    </p>
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => setOpenDelete(false)} color="primary">
                                                    Cancel
                                                </Button>
                                                <Button onClick={() => {
                                                    deletePost({ _id: post._id })
                                                    setOpenMore(false);
                                                }} color="primary">
                                                    Delete
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </>
                                )}
                                <Button style={{ padding: '10px' }} variant='outlined' onClick={() => setOpenMore(false)}>Cancel</Button>
                            </Paper>
                        </Dialog>
                    </>
                }
                title={<Typography onClick={() => history.push(`/user/profile/${post.username}`)} className={classes.user_dialog} variant='h6'>{post.username}</Typography>}
                subheader={moment(post.createdAt).fromNow()}
            />
            <div className={classes.line} />
            <div style={{ backgroundColor: 'none' }} onDoubleClick={handleLike}>
                <img style={{ display: 'block', margin: '0 auto', width: '100%' }} src={post.file} />
            </div>
            <CardActions>
                <IconButton disabled={isLogin} size='small'>
                    <Like />
                </IconButton>
                <IconButton disabled={isLogin} size='small'>
                    <ImageSearchIcon onClick={() => history.push(`/post/postView/${post._id}`)} fontSize='large' />
                </IconButton>
                <IconButton disabled={isLogin} size='small'>
                    <ShareIcon onClick={() => console.log(window.location.href + `post/postView/${post._id}`)} />
                </IconButton>
            </CardActions>
            <CardContent style={{ marginTop: '-21px' }}>
                <div style={{ display: 'flex' }}>
                    <Typography color='textPrimary' variant='h6'>{post.likes.length} like{post.likes.length > 1 ? 's' : ''}</Typography>
                </div>
                <div>
                    <Typography onClick={() => history.push(`/user/profile/${post.username}`)} className={classes.user_dialog} color='textPrimary' variant='h6'>{post.username}</Typography> &nbsp;{post.message}
                </div>
                <div>
                    <Typography
                        className={classes.user_dialog}
                        color='textSecondary'
                        variant='inherit'
                        onClick={() => setOpenComment(true)}
                    >
                        {post.comments.length > 0 ? (`view all ${post.comments.length} comments`) : ('Be the first to comment')}
                    </Typography>
                    <Dialog maxWidth='md' fullWidth open={openComment} onClose={() => setOpenComment(false)} TransitionComponent={Transition}>
                        <CommentDialogBox setOpenComment={setOpenComment} post={post} />
                    </Dialog>
                </div>
                {post.comments.length > 0 && (
                    <div>
                        <Typography onClick={() => history.push(`/user/profile/${post.username}`)} className={classes.user_dialog} color='textPrimary' variant='h6'>
                            {JSON.parse(post.comments[post.comments.length - 1]).username}
                        </Typography> &nbsp;
                        {JSON.parse(post.comments[post.comments.length - 1]).comment}
                    </div>
                )}
                {post.comments.length > 1 && (
                    <div>
                        <Typography onClick={() => history.push(`/user/profile/${post.username}`)} className={classes.user_dialog} color='textPrimary' variant='h6'>
                            {JSON.parse(post.comments[post.comments.length - 2]).username}
                        </Typography> &nbsp;
                        {JSON.parse(post.comments[post.comments.length - 2]).comment}
                    </div>
                )}
            </CardContent>
            <div className={classes.search}>
                <Avatar aria-label="recipe" className={classes.small} src={user?.profilePicture}>
                    {post.name.charAt(0)}
                </Avatar>
                <InputBase
                    style={{ marginLeft: '5px' }}
                    disabled={isLogin}
                    placeholder="Add your comment..."
                    fullWidth
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyPress={handleComment}
                />
            </div>
        </Card >
    );
}
