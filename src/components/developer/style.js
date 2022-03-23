import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    logo: {
        height: '100%',
        width: '100%',
        borderRadius: '11%'
    },
    error: {
        fontSize: '100px',
        margin: '2% auto',
        padding: '0px 11%',
    },
    btn: {
        fontSize: '50px',
        margin: '2% auto',
        padding: '0px 11%',
        background: 'crimson',
        
    }
}));