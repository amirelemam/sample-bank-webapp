import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Logo from '../shared/Logo';
import { root, button } from '../shared/styles';

const useStyles = makeStyles(() => ({
  root: {
    ...root,
    margin: 0,
  },
  button: {
    ...button,
  },
  text: {
    marginBottom: '20px',
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
