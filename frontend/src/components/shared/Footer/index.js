import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '60px',
    bottom: 0,
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Home"
          value="home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          component="a"
          href="https://linkedin.com/in/amirelemam"
          label="LinkedIn"
          value="linkedin"
          icon={<LinkedInIcon />}
        />
        <BottomNavigationAction
          component="a"
          href="https://github.com/amirelemam/sample-bank-webapp"
          label="Code"
          value="source-code"
          icon={<GitHubIcon />}
        />
      </BottomNavigation>
    </div>
  );
};

export default Footer;
