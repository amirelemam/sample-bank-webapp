import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Logo from '../shared/Logo';
import { makeStyles } from '@material-ui/core/styles';
import { button, root } from '../shared/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    ...root,
    color: 'white',
  },
  form: {
    width: '400px',
    color: '#ffffff',
  },
  button: { ...button, width: '400px' },
  linkButton: {
    color: '#00030e',
    textDecoration: 'none',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    '&:hover': { color: '#d4af37', textDecoration: 'underline' },
  },
}));

const Login = () => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    branch: '',
    account: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Logo />
      <FormControl fullWidth={false} size="small" className={classes.form}>
        <TextField
          color="primary"
          id="branch"
          label="Branch:"
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
            shrink: true,
          }}
          placeholder="0001"
          value={values.branch}
          onChange={handleChange('branch')}
        />
        <br />
        <TextField
          color="primary"
          id="account"
          label="Account Number:"
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
            shrink: true,
          }}
          placeholder="12345"
          value={values.account}
          onChange={handleChange('account')}
        />
      </FormControl>
      <br />
      <FormControl fullWidth={false} size="small" className={classes.form}>
        <InputLabel htmlFor="password" style={{ color: '#fff' }} shrink>
          Password
        </InputLabel>
        <Input
          id="password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          placeholder="*****"
          style={{ color: '#fff' }}
          endAdornment={
            <InputAdornment
              position="end"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </InputAdornment>
          }
        />
      </FormControl>
      <br />
      <Link to="/my-account" className={classes.linkButton}>
        <Button
          variant="outlined"
          size="large"
          fullWidth={true}
          className={classes.button}
        >
          <center>
            <b>Sign in</b>
          </center>
        </Button>
      </Link>
      <div style={{ paddingTop: '130px' }}>
        <Link to="/" className={classes.link}>
          Go to Menu
        </Link>
      </div>
    </div>
  );
};

export default Login;