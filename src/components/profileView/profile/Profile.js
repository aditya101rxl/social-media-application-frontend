import React, { useContext, useEffect, useState } from 'react'
import { Paper, GridList, GridListTile, GridListTileBar, Typography, Button, Grid, IconButton, CircularProgress } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import * as api from '../../../api'
import { useStyles } from './style';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom'
import { EditProfile } from '../edit/EditProfile';
import { GlobalContext } from '../../../context/global/GlobalStates';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { LoadingProfile } from '../../loading/profile';


export const Profile = () => {
    document.title = 'profile view'
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const params = useParams()
    const username = params.username;

    const [found_user, set_found_user] = useState(null);
    const [edit, setEdit] = useState(false);
    const { user } = useContext(GlobalContext)

    useEffect(async () => {
        const { data } = await api.findUser(username);
        // console.log(data.data);
        set_found_user(data);
    }, [location])


    const handleCreatePost = () => history.push('/post/createPost');
    const handleEdit = () => setEdit(prev => !prev)

    if (found_user === null) {
        return (
            <LoadingProfile />
        )
    }

    if (edit) {
        return (
            <EditProfile user={user} setEdit={setEdit} history={history} />
        )
    }

    return (
        <Paper className={classes.paper} style={{ maxWidth: "auto", margin: "0 auto" }}>
            <Typography style={{ margin: "0 auto" }} variant='overline'>Profile</Typography>
            {
                found_user.user ? (
                    <div className={classes.root}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={4}>
                                <div className={classes.header}>
                                    <img className={classes.image} src={found_user.user?.profilePicture} alt={found_user.user?.name} />
                                    <Button
                                        disabled={(found_user.user?._id) !== (user?._id)}
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        onClick={handleEdit}
                                        className={classes.margin}>
                                        <EditIcon /> &nbsp;Edit Profile
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <div className={classes.header}>
                                    <Typography variant='h6'>{found_user.user.name} - (username : {found_user.user.username})</Typography>
                                    <Typography color='secondary' variant='overline'>status: {found_user.user.status}</Typography>
                                </div>
                                <Grid container spacing={1}>
                                    <Grid item xs>
                                        <div className={classes.header}>
                                            <Typography variant='h6'>{found_user.post?.length}</Typography>
                                            <Typography variant='overline'>posts</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                                <div className={classes.header}>
                                    {(found_user.user?._id) === (user?._id) && (
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            color='primary'
                                            onClick={handleCreatePost}
                                            className={classes.margin}>
                                            Create New Post &nbsp; &nbsp;
                                            <AddAPhotoIcon />
                                        </Button>
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                        <div className={classes.root1}>
                            {found_user.post === null && (<div className={classes.header}><CircularProgress /></div>)}
                            {found_user.post?.length === 0 && (<div className={classes.header}>no posts</div>)}
                            {(found_user.post?.length !== 0 & found_user.post.length === 0) ? (<Typography variant='overline' style={{ margin: '35%' }}>No Posts</Typography>) : null}
                            <GridList cellHeight={250} cols={3}>
                                {found_user.post.map((tile) => (
                                    <GridListTile key={tile.img}>
                                        <img style={{ display: 'block', margin: '0 auto', width: '100%' }} src={tile.file} />
                                        <GridListTileBar
                                            title={tile.message}
                                            subtitle={<span>likes: {tile.likes.length} comments: {tile.comments.length}</span>}
                                            actionIcon={
                                                <IconButton onClick={() => history.push(`/post/postView/${tile._id}`)} aria-label={`info about ${tile.username}`} className={classes.icon}>
                                                    <InfoIcon />
                                                </IconButton>
                                            }
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    </div>
                ) : (
                    <Paper className={classes.paper}>
                        <ErrorOutlineIcon style={{ fontSize: 80 }} />
                        <Typography variant='h4'>No User found with given username: {username}</Typography>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            component={Link}
                            to='/'
                        >
                            <HomeIcon style={{ fontSize: 40 }} />
                        </IconButton>
                    </Paper>
                )
            }
        </Paper >
    )
}

