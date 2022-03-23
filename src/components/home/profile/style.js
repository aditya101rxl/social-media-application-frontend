import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: '80px',
        // alignItems: 'center',
        padding: theme.spacing(2),
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));