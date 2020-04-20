import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

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
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function Location(props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [curAddress, setCurAddress] = React.useState('');
  const loaded = React.useRef(false);
  const API = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDVkPCtEZpk_6NrNsqZqpbCW7dtBYTFHII&libraries=places';

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        API,
        document.querySelector('head'),
        'google-maps',
      );
    }
    loaded.current = true;
  }

  const handleChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleAddress = (event, value) => {
    event.preventDefault();
    if (value) {
      setCurAddress(value.description);
      props.onChange(value.description);
    }
  };

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  return (
    <>
    {AutocompleteComponent(handleAddress, options, handleChange, classes)}
    </>
  );
}

const AutocompleteComponent = (handleAddress, options, handleChange, classes) => {
  return (
  <Autocomplete
      id="google-map-demo"
      onChange={handleAddress}
      style={{ width: 300 }}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      renderInput={(params) => (
        locationTextField(params, handleChange)
      )}
      renderOption={(option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );
        return renderedBox(classes, parts, option)
      }}
    />
  )
}

const locationTextField = (params, handleChange) => {
  return (
  <TextField
          {...params}
          label="Enter your location"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
        );
}

const renderedBox = (classes, parts, option) => {
  return(
  <Grid container alignItems="center">
    <Grid item>
      <LocationOnIcon className={classes.icon} />
    </Grid>
    <Grid item xs>
      {parts.map((part, index) => (
        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
          {part.text}
        </span>
      ))}
      <Typography variant="body2" color="textSecondary">
        {option.structured_formatting.secondary_text}
      </Typography>
    </Grid>
  </Grid>
  );
}