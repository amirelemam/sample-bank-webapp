import React from 'react';
import Menu from './Menu';
import Logo from '../shared/Logo';
import { makeStyles } from '@material-ui/core/styles';
import { root } from '../shared/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    ...root,
    minHeight: '90vh',
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
        <a
          href="https://github.com/amirelemam/demo-bank-webapp"
          className="source-code"
        >
          Source code
        </a>
      </header>
    </div>
  );
};

export default Home;
