import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Logo from '../shared/Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: '#00030e',
    borderColor: '#00030e',
    backgroundColor: '#d4af37',
    border: '1px solid',
    '&:hover': {
      color: '#00030e',
      borderColor: '#00030e',
      backgroundColor: '#b08f26',
      boxShadow: 'none',
    },
  },
  text: {
    marginBottom: '40px',
  },
}));

const NotFound = ({ history }) => {
  const classes = useStyles();

  const handleClick = () => history.push('/');

  return (
    <div className={classes.root}>
      <Logo />

      <span className={classes.text}>Page Not Found</span>

      <Button
        variant="outlined"
        size="large"
        fullWidth={false}
        className={classes.button}
        onClick={handleClick}
      >
        <center>GO TO HOME</center>
      </Button>
    </div>
  );
};

export default NotFound;
