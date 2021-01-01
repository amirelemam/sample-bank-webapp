import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { button, root } from '../shared/styles';
import logo from '../../assets/img/logo.png';
import { isAuthenticated } from '../shared/auth';
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from '../../aws-exports';
import axios from 'axios';
Amplify.configure(aws_exports);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    ...root,
    flexGrow: 1,
    paddingTop: '100px',
  },
  button: { ...button, width: '150px' },
  button2: { ...button, width: '120px' },
  button3: { border: '1px solid', width: '120px', marginRight: '30px' },
  link: {
    color: '#fff',
    textDecoration: 'none',
    '&:hover': { color: '#d4af37' },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00030e',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: '#00030e',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const MyAccount = ({ history }) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [amount, setAmount] = React.useState(0.0);
  const [operation, setOperation] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  const [modalMsg, setModalMsg] = React.useState('');
  const [balance, setBalance] = React.useState('$0.00');

  useEffect(() => {
    (async () => {
      try {
        const hasAuthenticated = await isAuthenticated();

        if (!hasAuthenticated) {
          return history.push('/access-your-account');
        } else {
          const user = (await Auth.currentSession()).getIdToken();

          if (user) {
            const { payload } = user;

            const branch = payload['custom:branch'];
            const account = payload['custom:account'];

            const accessToken = user.getJwtToken();

            const response = await axios.get(
              `${BACKEND_URL}/accounts/branch/${branch}/account/${account}/balance`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            if (response && response.data && response.data.balance) {
              setBalance(response.data.balance);
            } else return history.push('/');
          } else return history.push('/access-your-account');
        }
      } catch (err) {
        return history.push('/access-your-account');
      }
    })();
  }, [BACKEND_URL, history]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeModal = (event) => {
    setAmount(event.target.value);
  };

  const handleCloseError = () => {
    setAmount(0.0);
    setIsOpen(false);
    setModalTitle('');
    setModalMsg('');
  };

  const handleSignOut = async () => {
    await Auth.signOut();
    return history.push('/');
  };

  const handleDepositOrWithdraw = async () => {
    try {
      const amount = Number(document.getElementById('amount').value);

      let url = '';

      if (operation === 'Deposit') {
        url = `${BACKEND_URL}/accounts/deposit`;
      } else {
        url = `${BACKEND_URL}/accounts/withdraw`;
      }

      const user = (await Auth.currentSession()).getIdToken();

      if (user) {
        const { payload } = user;

        const branch = payload['custom:branch'];
        const account = payload['custom:account'];

        const accessToken = user.getJwtToken();

        const response = await axios.post(
          url,
          {
            branch,
            account,
            amount,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response && response.data && response.data.balance) {
          setBalance(response.data.balance);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAmount(0.0);
      setIsOpen(false);
      setModalTitle('');
      setModalMsg('');
    }
  };

  const handleOpen = (e) => {
    const name = e.currentTarget.id;
    const operation = name.charAt(0).toUpperCase() + name.slice(1);

    setOperation(operation);

    setIsOpen(true);
    setModalTitle(`${operation}`);
    setModalMsg(`Define an amount to ${name}:`);
  };

  return (
    <div className={classes.root}>
      <div style={{ paddingBottom: '30px' }}>
        <div style={{ textAlign: 'left', float: 'left', width: '40px' }}>
          <img src={logo} alt="logo" width="30px" />{' '}
        </div>
        <div style={{ textAlign: 'left', float: 'left', width: '170px' }}>
          <span style={{ fontSize: '25px' }}> My Account</span>
        </div>
        <div
          style={{
            textAlign: 'right',
            float: 'right',
            width: '120px',
            paddingRight: '20px',
          }}
        >
          <span className={classes.link} onClick={handleSignOut}>
            <ExitToAppIcon />
          </span>
        </div>
      </div>
      <AppBar
        position="static"
        color="transparent"
        style={{ width: '340px', margin: 'auto' }}
      >
        <Tabs
          TabIndicatorProps={{
            style: { background: '#d4af37' },
          }}
          style={{ color: '#ffffff' }}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Balance" {...a11yProps(0)} />
          <Tab label="Credit Card" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div
          style={{
            width: '300px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              border: '1px solid',
              borderColor: '#999',
              borderRadius: '10px',
            }}
          >
            <br />
            <b>Available:</b>
            <h2>{balance}</h2>
          </div>
        </div>
        <br />
        <div
          style={{
            width: '300px',
            textAlign: 'center',
          }}
        >
          <Button
            id="deposit"
            variant="outlined"
            size="medium"
            fullWidth={true}
            className={classes.button2}
            onClick={handleOpen}
          >
            <center>
              <b>DEPOSIT</b>
            </center>
          </Button>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Button
            id="withdraw"
            variant="outlined"
            size="medium"
            fullWidth={true}
            className={classes.button2}
            onClick={handleOpen}
          >
            <center>
              <b>WITHDRAW</b>
            </center>
          </Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>You have no credit cards.</div>
        <br />
        <div>
          <center>
            <Button
              variant="outlined"
              size="large"
              fullWidth={true}
              className={classes.button}
            >
              <center>
                <b>APPLY NOW</b>
              </center>
            </Button>
          </center>
        </div>
      </TabPanel>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleCloseError}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{modalTitle}</h2>
            <p id="transition-modal-description">{modalMsg}</p>
            <Box display="flex" p={3} mx="auto" justifyContent="center">
              <FormControl className={classes.form}>
                <Input
                  id="amount"
                  startAdornment={
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  }
                  value={amount}
                  onChange={handleChangeModal}
                />
                <br />
                <div>
                  <Button
                    variant="contained"
                    className={classes.button3}
                    onClick={handleCloseError}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="contained"
                    className={classes.button2}
                    onClick={handleDepositOrWithdraw}
                  >
                    OK
                  </Button>
                </div>
              </FormControl>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default MyAccount;
