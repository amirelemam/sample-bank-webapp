import React, { useEffect, useState } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Logo from '../shared/Logo';
import { makeStyles } from '@material-ui/core/styles';
import { button, root } from '../shared/styles';
import { Link } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from '../../aws-exports';
import { isAuthenticated } from '../shared/auth';

Amplify.configure(aws_exports);

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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: '#000',
  },
}));

const Login = ({ history }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    branch: '',
    account: '',
    password: '',
    showPassword: false,
  });

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      const hasAuthenticated = await isAuthenticated();

      if (hasAuthenticated) {
        return history.push('/my-account');
      }
    })();
  });

  async function handleClick() {
    try {
      const branch = document.getElementById('branch').value;
      const account = document.getElementById('account').value;
      const password = document.getElementById('password').value;
      const username = branch + '_' + account;
      await Auth.signIn(username, password);
      const accessToken = await (await Auth.currentSession())
        .getIdToken()
        .getJwtToken();

      if (accessToken) {
        return history.push('/my-account');
      } else throw new Error();
    } catch (err) {
      setErrorMsg('Login unsucessful.');
      setError(true);
    }
  }

  const handleCloseError = () => {
    setError(false);
    setErrorMsg('');
  };

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
      <Button
        variant="outlined"
        size="large"
        fullWidth={true}
        className={classes.button}
        onClick={handleClick}
      >
        <center>
          <b>Sign in</b>
        </center>
      </Button>
      <div style={{ paddingTop: '130px' }}>
        <Link to="/" className={classes.link}>
          Go to Menu
        </Link>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={error}
        onClose={handleCloseError}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={error}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Error</h2>
            <p id="transition-modal-description">{errorMsg}</p>
            <Box display="flex" p={3} mx="auto" justifyContent="center">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseError}
              >
                OK
              </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Login;
