import React, {
  useEffect, useState, useRef, useMemo,
} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from './List';
import { root, link } from '../shared/styles';
import logo from '../../assets/img/logo.png';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

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
  const loaded = useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () => throttle((request, callback) => {
      autocompleteService.current.getPlacePredictions(request, callback);
    }, 200),
    [],
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handleSignOut = async () => {
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <div style={{ width: '500px' }}>
        <div style={{ textAlign: 'left', float: 'left', width: '40px' }}>
          <img src={logo} alt="logo" width="30px" />
          {' '}
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
        renderOption={(option) => {
          const matches = option.structured_formatting.main_text_matched_substrings;
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length]),
          );

          return (
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnIcon className={classes.icon} />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    style={{ fontWeight: part.highlight ? 700 : 400 }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="textSecondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />
      <List />
    </div>
  );
}
