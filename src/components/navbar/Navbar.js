import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { InputBase, AppBar, Toolbar, Typography, CssBaseline } from '@material-ui/core'
import { useScrollTrigger, Popover, IconButton, Badge, Menu, MenuItem, Button, Avatar } from '@material-ui/core'
import { ListItem, List, ListItemText, ListItemAvatar, Divider, CircularProgress } from '@material-ui/core'
import ClearAllIcon from '@material-ui/icons/ClearAll';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';
import { useStyles } from './style';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, useHistory } from 'react-router-dom'
import logo from '../../images/logo.jpeg'
import { GlobalContext } from '../../context/global/GlobalStates';
import * as api from '../../api'
import { Slide } from '@material-ui/core'

function ElevationScroll(props) {

    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: -1,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export const Navbar = (props) => {
    const classes = useStyles();
    const history = useHistory();
    // const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const { user, logout, clearNotice } = useContext(GlobalContext);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [openPop1, setOpenPop1] = useState(null);
    const open1 = Boolean(openPop1);
    const id1 = open1 ? 'simple-popover' : undefined;
    const [openPop2, setOpenPop2] = useState(null);
    const open2 = Boolean(openPop2);
    const id2 = open1 ? 'simple-popover' : undefined;

    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const handleQuerySearch = async (e) => {
        if (query.length !== 0) {
            setOpenPop1(e.currentTarget);
            const { data } = await api.searchQuery(query);
            setResult(data);
        }
    }

    const handleMobileMenuClose = () => setMobileMoreAnchorEl(null)
    const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget)
    const handleProfileView = () => { setMobileMoreAnchorEl(null); history.push(`/user/profile/${user?.username}`) }

    const reload = () => {
        if(window.location.pathname==='/') window.location.reload();
        history.push('/');
    }

    const SearchUser = () => {
        return (
            <Popover
                id={id1}
                open={open1}
                anchorEl={openPop1}
                onClose={() => { setQuery(''); setOpenPop1(null); setResult(null) }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List style={{ width: '250px', maxHeight: '350px' }}>
                    {result === null && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </div>
                    )}
                    {result?.length === 0 ? (
                        <Typography variant='h6'>No result found</Typography>
                    ) : (
                        result?.map(u => (
                            <>
                                <ListItem style={{ cursor: 'pointer' }} alignItems="flex-start"
                                    onClick={() => {
                                        setOpenPop1(null);
                                        setResult(null);
                                        setQuery("");
                                        history.push(`/user/profile/${u?.username}`)
                                    }}>
                                    <ListItemAvatar>
                                        <Avatar alt={u.name} src={u.profilePicture} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={u.username}
                                        secondary={u.name}
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        ))
                    )}
                </List>
            </Popover >
        )
    }

    const UserNotification = () => {
        return (
            <Popover
                id={id2}
                open={open2}
                anchorEl={openPop2}
                onClose={() => { setOpenPop2(null) }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List style={{ width: '250px', maxHeight: '350px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ marginBottom: '-7px' }}>Notifications</p>
                        <Link href onClick={(e) => { e.preventDefault(); clearNotice() }}>
                            mark all as read
                            <ClearAllIcon />
                        </Link>
                    </div>
                    <div style={{ backgroundColor: 'grey', height: '1px' }}></div>
                    {user?.notification?.length === 0 ? (
                        <Typography>No notification</Typography>
                    ) : (
                        user?.notification?.slice(0).reverse().map((notic, index) => {
                            return (
                                <ListItem
                                    button
                                    style={{ backgroundColor: `${index < user?.notificationCount ? '#ecd2d2' : ''}` }}
                                    key={index}
                                    role={undefined}
                                    dense
                                    onClick={() => {
                                        setOpenPop2(null);
                                        setMobileMoreAnchorEl(null);
                                        if (notic.message.indexOf('requested') !== -1) {
                                            history.push(`/user/profile/${notic.username}`)
                                        } else {
                                            history.push(`/post/postView/${notic?.id}`)
                                        }
                                    }}
                                >
                                    <ListItemText
                                        style={{ marginTop: '0', marginBottom: '-1px' }}
                                        primary={
                                            <Typography onClick={() => { setOpenPop2(null); setMobileMoreAnchorEl(null); history.push(`/user/profile/${notic.username}`) }} className={classes.user_dialog} color='textPrimary' variant='h6'>{notic.username}</Typography>
                                        }
                                        secondary={<div style={{ marginTop: '-7px' }}>{notic.message}</div>}
                                    />
                                </ListItem>
                            )
                        })
                    )}
                </List>
            </Popover>
        )
    }

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={(e) => { setOpenPop2(e.currentTarget); }} aria-describedby={id2}>
                <IconButton aria-label="show n new notifications" color="inherit">
                    <Badge badgeContent={user?.notificationCount} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <UserNotification />
            <MenuItem onClick={handleProfileView}>
                <IconButton aria-label="account of current user" color="inherit">
                    <Avatar alt={user?.name} src={user?.profilePicture} />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem component={Link} to='/about' onClick={() => setMobileMoreAnchorEl(null)}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge color="secondary">
                        <InfoIcon />
                    </Badge>
                </IconButton>
                <p>About App</p>
            </MenuItem>
            <MenuItem onClick={() => { logout(); setMobileMoreAnchorEl(null) }}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge color="secondary">
                        <ExitToAppIcon />
                    </Badge>
                </IconButton>
                <p>Logout</p>
            </MenuItem>
        </Menu>
    );

    return (
        <React.Fragment >
            <CssBaseline />
            {/* <HideOnScroll {...props}> */}
            <ElevationScroll {...props}>
                <div className={classes.grow} >
                    <AppBar color='default'>
                        <Toolbar>
                            {/* <Link to='/'>
                            </Link> */}
                            <img src={logo} alt='logo' className={classes.logo} onClick={reload}/>
                            <div className={classes.grow} />
                            <div className={classes.search} aria-describedby={id1}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyPress={(e) => { if (e.charCode === 13) { handleQuerySearch(e) } }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                            <SearchUser />
                            <div className={classes.grow} />
                            {
                                user ? (
                                    <>
                                        <div className={classes.sectionDesktop}>
                                            <IconButton
                                                edge="start"
                                                color="inherit"
                                                aria-label="open drawer"
                                                component={Link}
                                                to='/'
                                            >
                                                <HomeIcon style={{ fontSize: '32px' }} />
                                            </IconButton>
                                            <IconButton onClick={(e) => setOpenPop2(e.currentTarget)} aria-describedby={id2} aria-label="show 17 new notifications" color="inherit">
                                                <Badge badgeContent={user?.notificationCount} color="secondary">
                                                    <NotificationsIcon style={{ fontSize: '31px' }} />
                                                </Badge>
                                            </IconButton>
                                            <UserNotification setOpenPop2={setOpenPop2} />
                                            <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleProfileView}>
                                                <Avatar alt={user?.name} src={user?.profilePicture} />
                                            </IconButton>
                                            <IconButton color='secondary' aria-label="logout" onClick={() => logout()}>
                                                <ExitToAppIcon style={{ fontSize: '37px', color: 'crimson' }} />
                                            </IconButton>
                                        </div>
                                        <div className={classes.sectionMobile}>
                                            {user === null ? (
                                                <Button component={Link} to="/user/auth" variant='outlined' color='primary' >Sing In</Button>
                                            ) : (
                                                <IconButton
                                                    aria-label="show more"
                                                    aria-controls={mobileMenuId}
                                                    aria-haspopup="true"
                                                    onClick={handleMobileMenuOpen}
                                                    color="inherit"
                                                >
                                                    <Badge badgeContent={user?.notificationCount} color="secondary">
                                                        <Avatar alt={user?.name} src={user?.profilePicture} />
                                                    </Badge>
                                                </IconButton>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <Button component={Link} to="/user/auth" variant='outlined' color='primary' >Sing In</Button>
                                )
                            }
                        </Toolbar>
                    </AppBar>
                    {renderMobileMenu}
                </div>
            </ElevationScroll>
            {/* </HideOnScroll> */}
            <Toolbar />
        </React.Fragment >
    );
}
