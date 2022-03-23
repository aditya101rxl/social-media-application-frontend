import React from 'react';
import { useStyles } from './style';
import aditya from '../../images/aditya.jpg';
import { Grid, Typography } from '@material-ui/core'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

export const About = () => {
    const classes = useStyles();
    return (
        <div>
            <Typography variant='h4' style={{ margin: '1% auto' }}>SOCIAL MEDIA WEB APPLICATION</Typography>
            <Typography variant='h5' style={{ margin: '1% auto' }}>This Web Application Developed Using...</Typography>
            <ul>
                <li>
                    <Typography variant='h5' style={{ margin: '1% auto' }}>Frontend: React components, Hooks, Reducer, Context, ...</Typography>
                </li>
                <li>
                    <Typography variant='h5' style={{ margin: '1% auto' }}>Backend: Node.js and Express.js</Typography>
                </li>
                <li>
                    <Typography variant='h5' style={{ margin: '1% auto' }}>Database: MongoDB</Typography>
                </li>
            </ul>
            <Typography variant='h5' style={{ margin: '1% auto' }}>Operation Performed...</Typography>
            <ul>
                <li>
                    <Typography variant='h5' style={{ margin: '1% auto' }}>CRUD operation in MongoDB using Node.js & Express.js</Typography>
                </li>
                <li>
                    <Typography variant='h5' style={{ margin: '1% auto' }}>Email verification using Nodemailer</Typography>
                </li>
                <li>
                    <Typography variant='h5' style={{ margin: '1% auto' }}>User authentication using JWT (javascript web token)</Typography>
                </li>
                <li>
                    <Typography variant='h5' style={{ margin: '1% auto' }}>User password encryption using bcrypt</Typography>
                </li>
            </ul>
            <hr style={{ height: '10px', color: 'crimson' }} />
            <Grid container spacing={2} style={{ marginTop: '3%' }}>
                <Grid item sm={4}>
                    <img src={aditya} className={classes.logo} />
                </Grid>
                <Grid item sm={8}>
                    <Typography variant='h4' style={{ margin: '1% auto' }}>Designed and Developed by...</Typography>
                    <Typography variant='h5' style={{ margin: '1% auto' }}>ADITYA KUMAR GUPTA</Typography>
                    <Typography variant='h6' style={{ margin: '1% auto' }}>I'm currently pursuing B-tech in Electronic and Communication Engineering from Natonal Institute of Technology Jote, Arunachal Pradesh (Expected graduation year: 2023)</Typography>
                    <hr style={{ height: '7px', color: 'crimson' }} />
                    <Typography variant='h5' style={{ margin: '1% auto' }}>Contact me at...</Typography>
                    <a href="https://www.linkedin.com/in/aditya101rxl/" target="_blank">
                        <LinkedInIcon fontSize='large' />
                    </a>
                    <a href="https://www.instagram.com/_aadiraj_/" target="_blank">
                        <InstagramIcon fontSize='large' />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100009102873401" target="_blank">
                        <FacebookIcon fontSize='large' />
                    </a>
                    <Typography variant='h6' style={{ margin: '1% auto' }}> Mail me at: <span style={{ color: 'crimson' }}>aditya101rxl@gmail.com</span></Typography>
                </Grid>
            </Grid>
        </div >
    );
}