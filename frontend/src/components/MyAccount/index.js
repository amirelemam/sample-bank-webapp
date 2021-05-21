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
import { isAuthenticated, logout } from '../shared/auth';
import { SAVINGS, CHECKING } from '../../common/enums/accountTypes';
import Header from '../shared/Header';

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
      // eslint-disable-next-line react/jsx-props-no-spreading
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
    minHeight: 'calc(100vh - 145px)',
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
  account: {
    width: '300px',
    textAlign: 'center',
    border: '1px solid',
    borderColor: '#999',
    borderRadius: '10px',
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
          logout();
          return history.push('/access-your-account');
        }

        const branch = localStorage.getItem('branch');
        const account = localStorage.getItem('account');
        const accessToken = localStorage.getItem('access-token');

        const responseChecking = await axios.get(
          `${ACCOUNT_MANAGER_API}/accounts/balance?branch=${branch}&account=${account}&accountType=${CHECKING}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const responseSavings = await axios.get(
          `${ACCOUNT_MANAGER_API}/accounts/balance?branch=${branch}&account=${account}&accountType=${SAVINGS}`,
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
        return null;
      } catch (err) {
        logout();
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
    await logout();
    history.push('/');
  };

  const handleTransfer = async () => {
    try {
      if (Number(amount) <= 0) return;

      const hasAuthenticated = await isAuthenticated();

      if (!hasAuthenticated) {
        logout();
        history.push('/access-your-account');
      }

      const branch = localStorage.getItem('branch');
      const account = localStorage.getItem('account');
      const accessToken = localStorage.getItem('access-token');

      const response = await axios.post(
        `${ACCOUNT_MANAGER_API}/accounts/transfer`,
        {
          origin: {
            branch,
            account,
            accountType: origin,
          },
          destiny: {
            branch,
            account,
            accountType: destiny,
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
        if (response.data.destiny.accountType === SAVINGS) {
          setBalanceSavings(response.data.destiny.balance);
        } else if (response.data.origin.accountType === SAVINGS) {
          setBalanceSavings(response.data.origin.balance);
        }

        if (response.data.destiny.accountType === CHECKING) {
          setBalanceChecking(response.data.destiny.balance);
        } else if (response.data.origin.accountType === CHECKING) {
          setBalanceChecking(response.data.origin.balance);
        }
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    } finally {
      setAmount(0.0);
      setIsOpen(false);
      setModalTitle('');
      setModalMsg('');
    }
  };

  const handleOpen = () => {
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
      <Header title="My Account" historyParent={history} handleSignOutParent={handleSignOut} />
      <AppBar
        position="static"
        color="transparent"
        style={{ width: '340px' }}
      >
        <Tabs
          TabIndicatorProps={{
            style: { background: '#d4af37' },
          }}
          style={{ color: '#ffffff' }}
          value={value}
          onChange={handleChange}
        >
          <Tab label="Balance" {...a11yProps(0)} />
          <Tab label="Credit Card" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className={classes.account}>
          <b>Checking Account:</b>
          <h2>{balanceChecking}</h2>
        </div>
        <div className={classes.account}>
          <b>Savings Account:</b>
          <h2>{balanceSavings}</h2>
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
            fullWidth={true}
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
