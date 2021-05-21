import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import List from './List';
import { root, link } from '../shared/styles';
import logo from '../../assets/img/logo.png';
import PlaceAutocomplete from './PlaceAutocomplete';

const useStyles = makeStyles((theme) => ({
  root: { ...root },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  gridList: {
    width: 500,
    height: 450,
  },
  title: {
    fontSize: '20px',
    color: '#d4af37',
    paddingTop: '30px',
  },
  link,
}));

export default function GoogleMaps({ history }) {
  const classes = useStyles();
  const [branches, setBranches] = useState([]);

  const requestAllBranches = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BRANCH_FINDER_API}/branches`);

    const branchesFormatted = data.map((branch) => {
      const {
        name, address, city, state, country, zipCode,
      } = branch;
      return {
        name,
        address,
        cityStateZip: `${city}, ${state}, ${zipCode}`,
        country,
      };
    });
    setBranches(branchesFormatted);
  };
  useEffect(async () => {
    requestAllBranches();
  }, []);

  const handleSignOut = async () => {
    history.push('/');
  };

  const handleInput = (input) => {
    if (input.length === 0) requestAllBranches();
  };

  const handleAddress = async ({ lat, lng }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BRANCH_FINDER_API}/branches?lat=${lat}&lon=${lng}`);

      const {
        name, address, city, state, country, zipCode,
      } = response.data;

      const branchFormatted = {
        name,
        address,
        cityStateZip: `${city}, ${state}, ${zipCode}`,
        country,
      };
      setBranches([branchFormatted]);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <div style={{ width: '500px' }}>
        <div style={{ textAlign: 'left', float: 'left', width: '40px' }}>
          <img src={logo} alt="logo" width="30px" />
        </div>
        <div style={{ textAlign: 'left', float: 'left', width: '300px' }}>
          <span style={{ fontSize: '25px' }}> Find a branch</span>
        </div>
        <div
          style={{
            textAlign: 'right',
            float: 'right',
            width: '120px',
          }}
        >
          <span className={classes.link}>
            <ExitToAppIcon onClick={handleSignOut} />
          </span>
        </div>
        <PlaceAutocomplete handleAddress={handleAddress} handleInput={handleInput} />
      </div>
      <List branches={branches} />
    </div>
  );
}
