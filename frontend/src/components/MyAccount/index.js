import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { button, root } from '../shared/styles';
import logo from '../../assets/img/logo.png';
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from '../../aws-exports';
import { isAuthenticated } from '../shared/auth';

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
  link: {
    color: '#fff',
    textDecoration: 'none',
    '&:hover': { color: '#d4af37' },
  },
}));

const MyAccount = ({ history }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    (async () => {
      const hasAuthenticated = await isAuthenticated();

      if (!hasAuthenticated) {
        return history.push('/access-your-account');
      }
    })();
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSignOut = async () => {
    await Auth.signOut();
    return history.push('/');
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
            <h2>$ 1,000.00</h2>
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
            variant="outlined"
            size="medium"
            fullWidth={true}
            className={classes.button2}
          >
            <center>
              <b>DEPOSIT</b>
            </center>
          </Button>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Button
            variant="outlined"
            size="medium"
            fullWidth={true}
            className={classes.button2}
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
    </div>
  );
};

export default MyAccount;
