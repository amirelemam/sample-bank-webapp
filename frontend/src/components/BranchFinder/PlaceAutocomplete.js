import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';

export default function PlaceAutocomplete({ handleAddress, handleInput }) {
  const [currentAddress, setCurrentAddress] = useState('');

  const handleChange = (address) => {
    setCurrentAddress(address);
    handleInput(currentAddress);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => { handleAddress(latLng); })
      // eslint-disable-next-line
      .catch((error) => console.error('Error', error));
  };

  const handleClear = () => {
    setCurrentAddress('');
    handleInput('');
  };

  return (
    <PlacesAutocomplete
      value={currentAddress}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {
        ({
          getInputProps, suggestions, getSuggestionItemProps, loading,
        }) => (
          <div>
            <TextField
              variant="outlined"
              style={{
                backgroundColor: '#fff', marginTop: '30px', width: '98vw', maxWidth: '500px',
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CloseIcon onClick={handleClear} style={{ cursor: 'pointer' }} />
                  </InputAdornment>
                ),
              }}
              {...getInputProps({
                placeholder: 'Type your address...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? { backgroundColor: '#444', cursor: 'pointer' }
                  : { backgroundColor: '#000', cursor: 'pointer' };
                return (
                  <div
                    key={suggestion.index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style: { ...style, width: '98vw', maxWidth: '500px' },
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )
      }
    </PlacesAutocomplete>
  );
}
