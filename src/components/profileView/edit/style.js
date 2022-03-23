import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        // textAlign: 'center',
        // alignItems: 'center',
        padding: theme.spacing(2),
        // color: theme.palette.text.secondary,
    },
    image: {
        height: '100%',
        width: '100%',
        marginBottom: '7px'
    },
    input: {
        display: 'none',
    },
    margin: {
        marginTop: '10px'
    }
}));