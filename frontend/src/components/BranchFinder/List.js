import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
    color: '#000',
    backgroundColor: theme.palette.background.paper,
    marginTop: '20px',
  },
}));

export default function List() {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container component="dl" spacing={2}>
      <Grid item>
        <Typography component="dt" variant="h6">
          Branch Name
        </Typography>
        <Typography component="dd" variant="body2">
          <b>Nome</b> Loren ipsum
        </Typography>
        <Typography component="dd" variant="body2">
          <b>Idade</b> Loren ipsum
        </Typography>
      </Grid>
    </Grid>
  );
}
