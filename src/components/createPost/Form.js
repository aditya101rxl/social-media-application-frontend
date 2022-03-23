import React, { useState, useContext } from "react";
import { TextField, Button, Typography, Paper, GridList, GridListTile, Grid, Box } from '@material-ui/core'
import { Backdrop, CircularProgress } from '@material-ui/core'
import FileBase from 'react-file-base64'
import useStyle from "./style";
import { useHistory } from 'react-router-dom'
import defaultfile from '../../images/defaultfile.png'
import { GlobalContext } from '../../context/global/GlobalStates'

export const Form = () => {
    document.title = 'creating new post'
    const classes = useStyle()
    const history = useHistory()
    const [postData, setPostData] = useState({ message: '', tags: '', file: '' });
    const { createPost, user } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        const data = { ...postData, name: user.name, username: user.username, profilePicture: user.profilePicture }
        await createPost(data, history);
        setLoading(false);
    }

    const clear = () => {
        setPostData({ message: '', tags: '', file: '' })
    }

    if (!user?._id) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please login to create your own post and like, comment on other's post
                </Typography>
            </Paper>
        )
    }

    return (
        <>
            <Paper className={classes.paper}>
                <Typography style={{ margin: "0 auto" }} variant='h4'>Create your own post</Typography>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <div className={classes.root}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={4}>
                                <GridListTile key={user._id}>
                                    <img src={postData.file || defaultfile} alt='uploaded file' />
                                </GridListTile>
                                <div className={classes.fileInput}>
                                    <FileBase accept="image/*" id="contained-button-file" type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, file: base64 })} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Paper className={classes.paper}>
                                    <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                                </Paper >
                                <Paper className={classes.paper}>
                                    <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                                </Paper>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Button variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Clear</Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </Paper>
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" /> &nbsp;
            loading...
    </Backdrop>
        </>
    );
}