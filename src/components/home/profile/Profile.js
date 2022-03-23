import React, { useContext } from 'react'
import { Paper, Avatar, Typography, Button, Grid } from '@material-ui/core'
import { useStyles } from './style';
import { Link, useHistory } from 'react-router-dom'
import { GlobalContext } from '../../../context/global/GlobalStates';
import aditya from '../../../images/aditya.jpg'


export const Profile = () => {
    const classes = useStyles()
    const history = useHistory()
    const { user, logout } = useContext(GlobalContext)

    const handleProfileView = () => history.push(`/user/profile/${user.username}`);
    const handleCreatePost = () => history.push('/post/createPost');

    return (
        <Paper elevation={0} variant='outlined' className={classes.paper}>
            <Typography variant='subtitle1' style={{ margin: '0% auto' }}>User Profile</Typography>
            {
                user ? (
                    <>
                        <Grid container spacing={1}>
                            <Grid item sm={3}>
                                <Avatar className={classes.avatar} alt={user?.name} src={user?.profilePicture} ><Typography variant='h3'>{user?.name?.charAt(0)}</Typography></Avatar>
                            </Grid>
                            <Grid item sm={9}>
                                <Typography variant='h6'>{user?.name} ({user?.username})</Typography>
                                <p style={{ marginTop: '0', marginBottom: '0' }}>{user?.status}</p>
                            </Grid>
                        </Grid>
                        <Paper variant='outlined'>
                        </Paper>
                        <Grid container spacing={1}>
                            <Grid item sm={12}>
                                <Button fullWidth variant='contained' color='primary' onClick={handleCreatePost}>Create New Post</Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button fullWidth variant='outlined' color='primary' onClick={handleProfileView}>Profile</Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button fullWidth variant='outlined' color='secondary' onClick={() => logout()}>Logout</Button>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Typography variant='overline'>Login to get &nbsp; <span style={{color: 'crimson'}}> write access</span></Typography>
                        <Button component={Link} to="/user/auth" variant='outlined' color='primary' >Sing In</Button>
                    </>
                )
            }

            <hr style={{ color: '#fa0404', height: '7px' }} />
            <Typography variant='overline' style={{ margin: '1% auto', color: 'tomato' }}>About Developer</Typography>
            <Grid container spacing={1}>
                <Grid item sm={4}>
                    <Avatar className={classes.avatar} alt='Aditya Kumar Gupta' src={aditya} ><Typography variant='h3'>A</Typography></Avatar>
                </Grid>
                <Grid item sm={8}>
                    <Typography variant='h6'>ADITYA KUMAR GUPTA</Typography>
                    <p style={{ marginTop: '0', marginBottom: '0' }}>Learner...</p>
                    <Link to='/about'> Read more... </Link>
                </Grid>
            </Grid>
        </Paper>
    )
}

