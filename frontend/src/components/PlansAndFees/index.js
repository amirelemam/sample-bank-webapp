import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useFormik } from 'formik';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import NumberInput from './NumberInput';
import { button, root, radioButton } from '../shared/styles';
import { tabs, tableCaption } from './styles';
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
    minHeight: 'calc(100vh - 100px)',
    color: '#fff',
  },
  button: { ...button, width: '150px' },
  btnSimulate: {
    ...button, width: '180px', margin: 'auto', fontWeight: 'bold',
  },
  button3: { border: '1px solid', width: '120px', marginRight: '30px' },
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
  tableCell: {
    color: '#fff',
  },
  smallTableCell: {
    color: '#fff',
    width: '50px',
  },
  largeTableCell: {
    color: '#fff',
    width: '150px',
  },
  row: {
    width: '500px',
    textAlign: 'center',
  },
  rowSimulate: {
    width: '500px',
    textAlign: 'center',
    margin: 'auto',
    marginBottom: '30px',
    marginTop: '30px',
  },
  pricingLeft: {
    width: '248px',
    textAlign: 'center',
    float: 'left',
    border: '1px solid',
    borderColor: '#999',
    borderRadius: '10px',
    minHeight: '300px',
    paddingTop: '15px',
  },
  pricingRight: {
    width: '250px',
    textAlign: 'center',
    float: 'right',
  },
  pricingPro: {
    minHeight: '300px',
    paddingLeft: '5px',
    paddingRight: '5px',
    paddingTop: '20px',
    paddingBottom: '30px',
  },
  commonFeatures: {
    border: '1px solid',
    borderColor: '#999',
    borderRadius: '10px',
    lineHeight: '.5em',
    paddingTop: '30px',
    paddingBottom: '15px',
    width: '500px',
    textAlign: 'center',
  },
  divCheaper: {
    border: '1px solid',
    borderColor: '#999',
    borderRadius: '10px',
    lineHeight: '.5em',
    width: '248px',
    backgroundColor: '#fff',
    color: '#00030e',
    float: 'right',
  },
  divExpensive: {
    border: '1px solid',
    borderColor: '#999',
    borderRadius: '10px',
    lineHeight: '.5em',
    width: '248px',
    float: 'left',
  },
  btnBasic: {
    color: '#00030e',
    backgroundColor: '#fff',
    width: '120px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    marginTop: '80px',
    fontWeight: 'bold',
  },
  btnPro: {
    color: '#00030e',
    backgroundColor: '#d4af37',
    width: '120px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    fontWeight: 'bold',
  },
  titleSimulate: {
    color: '#d4af37',
  },
  appBar: {
    width: '340px',
  },
}));

const PlansAndFees = ({ history }) => {
  const [planPro, setPlanPro] = useState([]);
  const [planBasic, setPlanBasic] = useState([]);
  const [features, setFeatures] = useState([]);
  const [value, setValue] = useState(0);
  const [planCosts, setPlanCosts] = useState({});
  const classes = useStyles();

  const PLAN_SIMULATOR_API = process.env.REACT_APP_PLAN_SIMULATOR_API;

  useEffect(() => {
    (async () => {
      try {
        const responsePlans = await axios.get(`${PLAN_SIMULATOR_API}/plans`);

        const responseFeatures = await axios.get(`${PLAN_SIMULATOR_API}/features`);

        responsePlans.data.forEach((plan) => {
          if (plan.name === 'basic') setPlanBasic(plan.features);
          if (plan.name === 'pro') setPlanPro(plan.features);
        });

        setFeatures(responseFeatures.data);
      } catch (err) {
        // eslint-disable-next-line
        console.error(err);
      }
    })();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      creditCard: 'no',
      wireTransfers: 0,
      withdrawalsWithinNetwork: 0,
      withdrawalsOutsideNetwork: 0,
    },

    onSubmit: async (values) => {
      try {
        const {
          creditCard,
          wireTransfers,
          withdrawalsWithinNetwork,
          withdrawalsOutsideNetwork,
        } = values;

        const { data } = await axios.post(
          `${PLAN_SIMULATOR_API}/plans/best-plan`,
          [
            {
              id: 'e4c35ce9-8d1f-4224-908d-ab079ab06802',
              quantity: wireTransfers || 0,
            },
            {
              id: 'e8c35ce9-8d1f-4224-908d-ab079ab06802',
              quantity: creditCard === 'yes' ? 1 : 0,
            },
            {
              id: 'e6c35ce9-8d1f-4224-908d-ab079ab06802',
              quantity: withdrawalsWithinNetwork || 0,
            },
            {
              id: 'e7c35ce9-8d1f-4224-908d-ab079ab06802',
              quantity: withdrawalsOutsideNetwork || 0,
            },
          ],
        );

        setPlanCosts(data);
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Header title="Plans & Fees" historyParent={history} />
      <AppBar
        position="static"
        color="transparent"
        className={classes.appBar}
      >
        <Tabs
          TabIndicatorProps={{ style: tabs }}
          value={value}
          onChange={handleChange}
        >
          <Tab label="Plans" {...a11yProps(0)} />
          <Tab label="Find Your Plan" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className={classes.row}>
          <div className={classes.pricingLeft}>
            <h2>BASIC</h2>
            {planBasic.map((item) => <h4>{item.label}</h4>)}
            <div className={classes.btnBasic}>
              FREE
            </div>
          </div>
          <div className={classes.pricingRight}>
            <Paper
              elevation={0}
              className={classes.pricingPro}
            >
              <h2>PRO</h2>
              {planPro.map((item) => <h4>{item.label}</h4>)}
              <div className={classes.btnPro}>
                $10/mo.
              </div>
            </Paper>
          </div>
        </div>
        <div className={classes.row}>
          <TableContainer>
            <Table>
              <caption style={tableCaption}>
                * Applications are subject to approval
              </caption>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}><b>Extra</b></TableCell>
                  <TableCell className={classes.tableCell}><b>Price</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {features.map((feature) => (
                  <TableRow key={feature.id}>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                      {feature.name}
                    </TableCell>
                    <TableCell className={classes.tableCell}>{`$${feature.price} / ${feature.pricetype}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={classes.commonFeatures}>
          <b>All plans include:</b>
          <h5>&#10003; Debit Card</h5>
          <h5>&#10003; Mobile App</h5>
          <h5>&#10003; 24/7 Customer Service</h5>
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}><b>Feature</b></TableCell>
                  <TableCell className={classes.tableCell}>
                    <center><b>Quantity</b></center>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tableCell} component="th" scope="row">
                    Wire Transfer
                  </TableCell>
                  <TableCell className={classes.smallTableCell}>
                    <TextField
                      id="wireTransfers"
                      name="wireTransfers"
                      onChange={formik.handleChange}
                      error={formik.errors.wireTransfers && formik.touched.wireTransfers}
                      value={formik.values.wireTransfers}
                      InputProps={{
                        inputComponent: NumberInput,
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell} component="th" scope="row">
                    ATM Withdrawal (our network)
                  </TableCell>
                  <TableCell className={classes.smallTableCell}>
                    <TextField
                      id="withdrawalsWithinNetwork"
                      name="withdrawalsWithinNetwork"
                      onChange={formik.handleChange}
                      error={formik.errors.withdrawalsWithinNetwork
                        && formik.touched.withdrawalsWithinNetwork}
                      value={formik.values.withdrawalsWithinNetwork}
                      InputProps={{
                        inputComponent: NumberInput,
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableCell} component="th" scope="row">
                    ATM Withdrawal (other banks)
                  </TableCell>
                  <TableCell className={classes.smallTableCell}>
                    <TextField
                      id="withdrawalsOutsideNetwork"
                      onChange={formik.handleChange}
                      name="withdrawalsOutsideNetwork"
                      error={formik.errors.withdrawalsOutsideNetwork
                        && formik.touched.withdrawalsOutsideNetwork}
                      value={formik.values.withdrawalsOutsideNetwork}
                      InputProps={{
                        inputComponent: NumberInput,
                      }}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className={classes.tableCell} component="th" scope="row">
                    Do you want a Credit Card?
                  </TableCell>
                  <TableCell className={classes.largeTableCell}>
                    <RadioGroup
                      row
                      aria-label="position"
                      defaultValue="top"
                      name="creditCard"
                      value={formik.values.creditCard}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel value="yes" control={<Radio name="creditCard" style={radioButton} />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio name="creditCard" style={radioButton} />} label="No" />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.rowSimulate}>
            <Button
              variant="outlined"
              size="medium"
              fullWidth={true}
              className={classes.btnSimulate}
              type="submit"
            >
              SIMULATE
            </Button>
          </div>
          <div
            className={classes.row}
            hidden={Object.keys(planCosts).length === 0}
          >
            <div className={classes.divExpensive}>
              <br />
              <h5>{planCosts.expensive && planCosts.expensive.plan.toUpperCase()}</h5>
              <h5>
                $
                {planCosts.expensive && planCosts.expensive.cost}
                /mo.
              </h5>
            </div>
            <div className={classes.divCheaper}>
              <h3 className={classes.titleSimulate}>CHEAPER</h3>
              <h4>{planCosts.cheaper && planCosts.cheaper.plan.toUpperCase()}</h4>
              <h4>
                $
                {planCosts.cheaper && planCosts.cheaper.cost}
                /mo.
              </h4>
            </div>
          </div>
        </form>
      </TabPanel>
    </div>
  );
};

export default PlansAndFees;
