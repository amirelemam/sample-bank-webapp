import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';

export default function PlaceAutocomplete({ handleAddress, handleInput }) {
  const [currentAddress, setCurrentAddress] = useState('');

  const handleChange = (address) => {
    setCurrentAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => { handleAddress(latLng); })
      // eslint-disable-next-line
      .catch((error) => console.error('Error', error));
  };

  handleInput(currentAddress);

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
              style={{ width: '500px', backgroundColor: '#fff', marginTop: '30px' }}
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
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
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
