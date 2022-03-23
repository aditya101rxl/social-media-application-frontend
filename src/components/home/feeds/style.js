import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 'lg',
        marginBottom: '40px'
    },
    media: {
        paddingTop: '100.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    dialog_paper: {
        width: '320px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    user_dialog: {
        display: 'inline-block',
        cursor: 'pointer',
        "&:hover": {
            textDecoration: 'underline',
        }
    },
    search: {
        display: 'flex',
        width: '100%',
        marginTop: '-13px',
        marginLeft: '12px'
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    hover: {
        '&:hover': {
            cursor: 'pointer',
        }
    },
    commentDialog: {
        width: '80vw',
    },
    head: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));