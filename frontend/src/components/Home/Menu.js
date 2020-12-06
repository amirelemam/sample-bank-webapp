import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '350px',
  },
  option: {
    minHeight: '50px',
    fontSize: '20px',
    justifyContent: 'center',
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();

  const handleMouseEnter = (e) => (e.target.style.color = '#d4af37');
  const handleMouseLeave = (e) => (e.target.style.color = '#ffffff');

  return (
    <MenuList className={classes.root}>
      <MenuItem
        className={classes.option}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        ACCESS YOUR ACCOUNT
      </MenuItem>
      <MenuItem
        className={classes.option}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        PLANS & FEES
      </MenuItem>
      <MenuItem
        className={classes.option}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        FIND A BRANCH
      </MenuItem>
    </MenuList>
  );
}
