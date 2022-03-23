import React, { useState, useContext } from 'react'
import { Avatar, Container, Paper, Typography, Grid, TextField, Button } from '@material-ui/core'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core'
import useStyle from './style'
import { useHistory } from 'react-router-dom'
import Slide from '@material-ui/core/Slide';
import * as api from '../../api'
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack'
import { Backdrop, CircularProgress } from '@material-ui/core'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const initialState = { username: '', password: '', confirmPassword: '' };

export const ForgetPass = () => {
    document.title = 'set new password'
    const classes = useStyle()
    const history = useHistory()
    const [isVerified, setIsVerified] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [openEmailDialog, setOpenEmailDialog] = useState(false);
    const [loginFormData, setLoginFormData] = useState(initialState);

    const { enqueueSnackbar } = useSnackbar()

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        document.title = 'loading...'
        setLoading(true);
        e.preventDefault()
        if (loginFormData.password !== loginFormData.confirmPassword) {
            const message = "password don't match !";
            enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
        } else {
            const { data } = await api.setNewPassword({ username: loginFormData.username, password: loginFormData.password })
            enqueueSnackbar(data.message, {
                variant: 'success',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
            history.push('/user/auth');
        }
        setLoading(false);
    }
    const handleChange = (e) => setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    const [generatedOtp, setGeneratedOtp] = useState(null);

    const getOtp = async () => {
        if (loginFormData.username.length === 0) {
            const message = 'please enter valid username !';
            enqueueSnackbar(message, {
                variant: 'warning',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
        } else {
            try {
                setLoading(true)
                const { data } = await api.getOtpToSetNewPassword({ username: loginFormData.username });
                // console.log(data);
                let variant = data.message.indexOf('box') !== -1 ? 'success' : 'error';
                enqueueSnackbar(data.message, {
                    variant,
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
                setLoading(false)
                setOpenEmailDialog(true)
                setGeneratedOtp(data.otp)
            } catch (error) {
                console.log(error);
                setLoading(false)
                const message = 'something went wrong please try again !'
                enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
            }
        }
    }

    const EmailVerification = () => {
        const [otp, setOtp] = useState('');
        const handleEmailVerification = () => {
            // console.log(generatedOtp);
            if (otp != generatedOtp) {
                const message = 'You have entered wrong otp !'
                enqueueSnackbar(message, {
                    variant: 'warning',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
            } else {
                const message = 'email successfully verified. Set new Password'
                enqueueSnackbar(message, {
                    variant: 'success',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
                setOpenEmailDialog(false);
                setIsEmailVerified(prev => !prev);
                setIsVerified(true);
            }
        }


        return (
            <>
                <DialogTitle id="alert-dialog-slide-title">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h4'>
                            {"Enter OTP"}
                        </Typography>
                        <IconButton onClick={() => setOpenEmailDialog(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Enter the OTP sent on your given email address to verify your email.<br />
                        To set your new password.
                        <TextField
                            autoFocus
                            margin="dense"
                            id="otp"
                            label="Enter OTP"
                            type="text"
                            fullWidth
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </DialogContentText>
                </DialogContent>
                <Button style={{ margin: '10px 20px', marginTop: '-10px' }} variant='outlined' onClick={handleEmailVerification} color="secondary">
                    Verify
                </Button>
            </>
        )
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <VpnKeyIcon />
                    </Avatar>
                    <Typography variant='h4'>Set Password</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField disabled={isVerified} name='username' label='User Name' type='text' required fullWidth onChange={handleChange} />
                            </Grid>
                            {isVerified ? (
                                <>
                                    <Grid item xs={12}>
                                        <TextField name='password' label='new Password' type='password' required fullWidth onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField name='confirmPassword' label='Confirm new Password' type='password' required fullWidth onChange={handleChange} />
                                    </Grid>
                                    {/* <Button fullWidth variant="contained" color='primary' onClick={getOtp} className={classes.submit}>
                                        save password
                                    </Button> */}
                                </>
                            ) : (
                                <Button fullWidth variant="contained" color='primary' onClick={getOtp} className={classes.submit}>
                                    send OTP
                                </Button>
                            )}
                        </Grid>
                        {!isEmailVerified && (
                            <>
                                <Dialog
                                    open={openEmailDialog}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    // onClose={() => setOpenEmailDialog(false)}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <EmailVerification />
                                </Dialog>
                            </>
                        )}
                        <Button type='submit' disabled={!isEmailVerified} fullWidth variant="contained" color='primary' className={classes.submit}>
                            save password
                        </Button>
                    </form>
                    <Button className={classes.switch} onClick={() => history.push('/user/auth')}>
                        cancel
                    </Button>
                </Paper>
            </Container >
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" /> &nbsp;
                    loading...
            </Backdrop>
        </>
    )
}

