import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useFormik } from 'formik';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import NumberInput from './NumberInput';
import logo from '../../assets/img/logo.png';
import { button, root } from '../shared/styles';

function createData(feature, price) {
  return {
    feature, price,
  };
}

const rows = [
  createData('Wire transfer', '$5 / each'),
  createData('ATM withdrawal (our network)', '$2 / each'),
  createData('ATM withdrawal (other banks)', '$3 / each'),
  createData('Credit card fee*', '$50 / year'),
];

const rows2 = [
  createData('Wire transfer'),
  createData('ATM withdrawal (our network)'),
  createData('ATM withdrawal (other banks)'),
  createData('Credit card'),
];

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
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
    minHeight: 'calc(100vh - 100px)',
    color: '#fff',
  },
  button: { ...button, width: '150px' },
  button2: { ...button, width: '180px' },
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
  table: {
    color: '#fff',
  },
}));

const MyAccount = ({ history }) => {
  const [price, setPrice] = useState(0);
  // const [error, setError] = useState(false);
  // const [errorMsg, setErrorMsg] = useState('');

  // const PLAN_SIMULATOR_API = process.env.REACT_APP_PLAN_SIMULATOR_API;
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      wireTransfers: '',
      withdrawalsWithinNetwork: '',
      withdrawalsOutsideNetwork: '',
    },

    validate: (values) => {
      const errors = {};

      if (!values.wireTransfers) errors.wireTransfers = true;
      if (!values.withdrawalsWithinNetwork) errors.withdrawalsWithinNetwork = true;
      if (!values.withdrawalsOutsideNetwork) errors.withdrawalsOutsideNetwork = true;

      return errors;
    },
    // validate before send to api
    // onSubmit: async (values) => {
    //   // const {
    //   //   wireTransfers,
    //   //   withdrawalsWithinNetwork,
    //   //   withdrawalsOutsideNetwork,
    //   // } = values;

    // const { status } = await axios.post(
    //   `${process.env.REACT_APP_BACKEND_URL}/payment-transactions`,
    //   {
    //     wireTransfers,
    //     withdrawalsWithinNetwork,
    //     withdrawalsOutsideNetwork,
    //   },

    // );

    // if (status >= 200 && status < 400) {
    //   setErrorMsg('');
    //   setError(false);
    // return history.push('/confirmacao-pedido');
    // }
    // setErrorMsg('Erro processando o cartão');
    // setError(true);
    // } else {
    //   localStorage.setItem('redirectPage', 'informacoes-de-pagamento');
    //   return history.push('/entrar');
    // }
    // },
  });

  // load plans data
  // useEffect(() => {
  //   (async () => {
  //     try {

  //       return null;
  //     } catch (err) {
  //       return history.push('/access-your-account');
  //     }
  //   })();
  // }, [PLAN_SIMULATOR_API, history]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSignOut = async () => {
    history.push('/');
  };

  const handlePriceChange = (e) => {
    if (!Number.isNaN(parseFloat(e.target.value))) {
      setPrice(parseFloat(e.target.value));
    }
  };

  return (
    <div className={classes.root}>
      <div style={{ paddingBottom: '30px', width: '500px' }}>
        <div style={{ textAlign: 'left', float: 'left', width: '40px' }}>
          <img src={logo} alt="logo" width="30px" />
          {' '}
        </div>
        <div style={{ textAlign: 'left', float: 'left', width: '170px' }}>
          <span style={{ fontSize: '25px' }}> Plans & Fees</span>
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
          <Tab label="Plans" {...a11yProps(0)} />
          <Tab label="Find Your Plan" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div
          style={{
            width: '500px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '250px',
              textAlign: 'center',
              float: 'left',

            }}
          >
            <div
              style={{
                border: '1px solid',
                borderColor: '#999',
                borderRadius: '10px',
                minHeight: '300px',
              }}
            >
              <br />
              <h2>BASIC</h2>
              <h4>1 Wire Transfer</h4>
              <h4>1 ATM Withdrawal (our network)</h4>
              <h4>&nbsp;</h4>
              <center>
                <div style={{
                  color: '#00030e',
                  backgroundColor: '#fff',
                  width: '120px',
                  height: '36px',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                >
                  <b>FREE</b>
                </div>
              </center>
            </div>
          </div>
          <div
            style={{
              width: '250px',
              textAlign: 'center',
              float: 'right',
            }}
          >
            <Paper
              elevation={0}
              style={{
                minHeight: '300px',
                paddingLeft: '5px',
                paddingRight: '5px',
              }}
            >
              <br />
              <h2>PRO</h2>
              <h4>5 Wire Transfers</h4>
              <h4>
                3 ATM Withdrawals (our network)
              </h4>
              <h4>1 ATM Withdrawal (other banks)</h4>
              <h4>No Credit Card Fee</h4>
              <center>
                <div style={{
                  color: '#00030e',
                  backgroundColor: '#d4af37',
                  width: '120px',
                  height: '36px',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                >
                  <b>$10/mo.</b>
                </div>
              </center>
              <h4>&nbsp;</h4>
            </Paper>
          </div>
        </div>

        <div
          style={{
            width: '500px',
            textAlign: 'center',
            color: '#fff',
            paddingBottom: '30px',
          }}
        >
          <TableContainer>
            <Table className={classes.table}>
              <caption style={{ color: '#fff' }}>* Applications are subject to approval</caption>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: '#fff' }}><b>Extra</b></TableCell>
                  <TableCell style={{ color: '#fff' }}><b>Price</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell style={{ color: '#fff' }} component="th" scope="row">
                      {row.feature}
                    </TableCell>
                    <TableCell style={{ color: '#fff' }}>{row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div
          style={{
            width: '500px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              border: '1px solid',
              borderColor: '#999',
              borderRadius: '10px',
              lineHeight: '.5em',
            }}
          >
            <br />
            <br />
            <b>All plans include:</b>
            <h5>&#10003; Debit Card</h5>
            <h5>&#10003; Mobile App</h5>
            <h5>&#10003; 24/7 Customer Service</h5>
          </div>
        </div>
        <br />
        <br />
        <div
          style={{
            width: '500px',
            textAlign: 'center',
          }}
        >
          <center>
            <Button
              variant="outlined"
              size="medium"
              fullWidth={true}
              className={classes.button2}
            >
              <center>
                <b>FIND YOUR PLAN</b>
              </center>
            </Button>
          </center>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <center>
          <Typography>
            Type your monthly usage:
          </Typography>
        </center>

        <form onSubmit={formik.handleSubmit}>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: '#fff' }}><b>Feature</b></TableCell>
                  <TableCell style={{ color: '#fff' }}><b>Quantity</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows2.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell style={{ color: '#fff' }} component="th" scope="row">
                      {row.feature}
                    </TableCell>
                    <TableCell style={{ color: '#fff', width: '100px' }}>
                      <TextField
                        style={{ color: '#fff' }}
                        value={price}
                        onChange={handlePriceChange}
                        name="numberformat"
                        id="formatted-numberformat-input"
                        color="primary"
                        InputProps={{
                          inputComponent: NumberInput,
                          color: 'primary',
                          classes: {
                            input: {
                              multilineColor: {
                                color: 'white',
                              },
                            },
                            color: 'white',
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </form>
        <br />
        <br />
        <div
          style={{
            width: '500px',
            textAlign: 'center',
          }}
        >
          <center>
            <Button
              variant="outlined"
              size="medium"
              fullWidth={true}
              className={classes.button2}
            >
              <center>
                <b>SIMULATE</b>
              </center>
            </Button>
          </center>
        </div>
      </TabPanel>
    </div>
  );
};

export default MyAccount;
