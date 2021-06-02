import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '98vw',
    maxWidth: '500px',
    color: '#000',
    backgroundColor: theme.palette.background.paper,
    marginTop: '20px',
    marginBottom: '20px',
  },
}));

export default function List({ branches }) {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container component="dl" spacing={2}>
      {branches.map((branch) => (
        <>
          <Grid item key={branch.id} xs={12}>
            <Typography component="dt" variant="h6">
              {' '}
              {branch.name}
            </Typography>
            <Typography component="dd" variant="body2">
              {' '}
              {branch.address}
            </Typography>
            <Typography component="dd" variant="body2">
              {' '}
              {branch.cityStateZip}
            </Typography>
            <Typography component="dd" variant="body2">
              {' '}
              {branch.country}
            </Typography>
          </Grid>
        </>
      ))}
    </Grid>
  );
}
