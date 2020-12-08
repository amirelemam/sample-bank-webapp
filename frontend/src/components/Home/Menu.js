import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '350px',
  },
  option: {
    minHeight: '50px',
    fontSize: '20px',
    justifyContent: 'center',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    '&:hover': {
      color: '#d4af37',
      textDecoration: 'none',
    },
  },
}));

const Menu = () => {
  const classes = useStyles();

  return (
    <MenuList className={classes.root}>
      <MenuItem className={classes.option}>
        <Link to="/access-your-account" className={classes.link}>
          ACCESS YOUR ACCOUNT
        </Link>
      </MenuItem>
      <MenuItem className={classes.option}>
        <Link to="/plans-and-fees" className={classes.link}>
          PLANS & FEES
        </Link>
      </MenuItem>
      <MenuItem className={classes.option}>
        <Link to="/find-a-branch" className={classes.link}>
          FIND A BRANCH
        </Link>
      </MenuItem>
    </MenuList>
  );
};

export default Menu;
