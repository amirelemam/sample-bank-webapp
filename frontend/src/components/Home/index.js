import React from 'react';
import Menu from './Menu';
import Logo from '../shared/Logo';
import { makeStyles } from '@material-ui/core/styles';
import { root } from '../shared/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    ...root,
    color: 'white',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <header className={classes.root}>
        <Logo />
        <Menu />
      </header>
    </div>
  );
};

export default Home;
