import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import List from './List';
import { root, link } from '../shared/styles';
import logo from '../../assets/img/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    ...root,
  },
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
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [branches, setBranches] = useState([]);

  console.log(inputValue);

  useEffect(async () => {
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
  }, []);

  const handleSignOut = async () => {
    history.push('/');
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
      </div>

      <Autocomplete
        id="google-map-demo"
        style={{
          width: '100%',
          maxWidth: 500,
          backgroundColor: '#fff',
          marginTop: '30px',
        }}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="Type your address..."
            variant="outlined"
            fullWidth
          />
        )}
      />
      <List branches={branches} />
    </div>
  );
}
