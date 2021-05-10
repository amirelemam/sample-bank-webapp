import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useEffect, useState } from 'react';
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
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import axios from 'axios';
import { button, root } from '../shared/styles';
import logo from '../../assets/img/logo.png';
import { isAuthenticated } from '../shared/auth';
import { SAVINGS, CHECKING } from '../../common/enums/accountTypes';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

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
    paddingTop: '20px',
  },
}));

const MyAccount = ({ history }) => {
  const ACCOUNT_MANAGER_API = process.env.REACT_APP_ACCOUNT_MANAGER_API;
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(0.0);
  const [origin, setOrigin] = useState('CHECKING');
  const [destiny, setDestiny] = useState('SAVINGS');
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMsg, setModalMsg] = useState('');
  const [balanceChecking, setBalanceChecking] = useState('$0.00');
  const [balanceSavings, setBalanceSavings] = useState('$0.00');
  const [selection, setSelection] = useState('checking-to-savings');

  useEffect(() => {
    (async () => {
      try {
        const hasAuthenticated = await isAuthenticated();

        if (!hasAuthenticated) {
          return history.push('/access-your-account');
        }
        const user = (await Auth.currentSession()).getIdToken();

        if (user) {
          const { payload } = user;

          const branch = payload['custom:branch'];
          const account = payload['custom:account'];

          const accessToken = user.getJwtToken();

          const responseChecking = await axios.get(
            `${ACCOUNT_MANAGER_API}/accounts/branch/${branch}/account/${account}/type/${CHECKING}/balance`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          const responseSavings = await axios.get(
            `${ACCOUNT_MANAGER_API}/accounts/branch/${branch}/account/${account}/type/${SAVINGS}/balance`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          if (
            responseChecking
            && responseChecking.data
            && responseChecking.data.balance
          ) {
            setBalanceChecking(responseChecking.data.balance);
          }
          if (
            responseSavings
            && responseSavings.data
            && responseSavings.data.balance
          ) {
            setBalanceSavings(responseSavings.data.balance);
          }
        } else return history.push('/access-your-account');
      } catch (err) {
        return history.push('/access-your-account');
      }
    })();
  }, [ACCOUNT_MANAGER_API, history]);

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

  const handleTransfer = async () => {
    try {
      if (Number(amount) <= 0) return;

      const url = `${ACCOUNT_MANAGER_API}/accounts/transfer`;

      const user = (await Auth.currentSession()).getIdToken();

      if (user) {
        const { payload } = user;

        const branch = payload['custom:branch'];
        const account = payload['custom:account'];

        const accessToken = user.getJwtToken();

        const response = await axios.post(
          url,
          {
            origin: {
              branch,
              account,
              type: origin,
            },
            destiny: {
              branch,
              account,
              type: destiny,
            },
            amount: Number(amount),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (
          response
          && response.data
          && response.data.origin
          && response.data.destiny
        ) {
          if (response.data.destiny.type === SAVINGS) {
            setBalanceSavings(response.data.destiny.balance);
          } else if (response.data.origin.type === SAVINGS) {
            setBalanceSavings(response.data.origin.balance);
          }

          if (response.data.destiny.type === CHECKING) {
            setBalanceChecking(response.data.destiny.balance);
          } else if (response.data.origin.type === CHECKING) {
            setBalanceChecking(response.data.origin.balance);
          }
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
    setIsOpen(true);
    setModalTitle('Transfer');
    setModalMsg('');
  };

  const handleChangeSelect = (event) => {
    setSelection(event.target.value);

    switch (event.target.value) {
      case 'checking-to-savings':
        setOrigin(CHECKING);
        setDestiny(SAVINGS);
        break;
      case 'savings-to-checking':
        setOrigin(SAVINGS);
        setDestiny(CHECKING);
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <div style={{ paddingBottom: '30px' }}>
        <div style={{ textAlign: 'left', float: 'left', width: '40px' }}>
          <img src={logo} alt="logo" width="30px" />
          {' '}
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
            <b>Checking Account:</b>
            <h2>{balanceChecking}</h2>
          </div>
        </div>
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
            <b>Savings Account:</b>
            <h2>{balanceSavings}</h2>
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
            id="transfer"
            variant="outlined"
            size="medium"
            fullWidth
            className={classes.button2}
            onClick={handleOpen}
          >
            <center>
              <b>TRANSFER</b>
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
              fullWidth
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
            <h2>{modalTitle}</h2>
            <p>{modalMsg}</p>
            <div mx="auto" className={classes.form}>
              <InputLabel htmlFor="origin-destiny-required">
                Origin / Destiny:
              </InputLabel>
              <Select
                native
                onChange={handleChangeSelect}
                value={selection}
                inputProps={{
                  id: 'origin-destiny-required',
                }}
              >
                <option value="checking-to-savings">Checking to Savings</option>
                <option value="savings-to-checking">Savings to Checking</option>
                <option disabled value="cheking-to-external">
                  Checking to Someone Else
                </option>
                <option disabled value="savings-to-external">
                  Savings to Someone Else
                </option>
              </Select>
              <div mx="auto" className={classes.form}>
                <InputLabel htmlFor="amount-required">Amount:</InputLabel>
                <Input
                  id="amount"
                  label="Amount"
                  startAdornment={(
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  )}
                  value={amount}
                  onChange={handleChangeModal}
                  inputProps={{
                    id: 'amount-required',
                  }}
                />
              </div>
              <div mx="auto" className={classes.form}>
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
                  onClick={handleTransfer}
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default MyAccount;
