import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    userPost: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        // textAlign: 'center',
        // alignItems: 'center',
        padding: theme.spacing(2),
        // color: theme.palette.text.secondary,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    posts: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(3),
    },
    gridList: {
        marginLeft : theme.spacing(3),
        // height: 250,
        transform: 'translateZ(0)',
    },
    image:{
        marginTop: '-75px',
        height:'80%',
        width:'100%'
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    margin: {
        margin: theme.spacing(1),
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    avatar:{
        marginRight: '2%'
    }
}));