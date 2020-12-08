import React from 'react';
import Menu from './Menu';
import Logo from '../shared/Logo';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
