import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import LicenseSummary from './LicenseSummary';

import { useForm, Controller } from 'react-hook-form';
import { DevTool } from 'react-hook-form-devtools';
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

import Location from "./Location";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepper: {
    background: 'transparent'
  },
  questionCard: {
    boxShadow: "0 0 14px 0 rgba(53,64,82,.05)",
    borderRadius: '10px',
    background: 'white',
    margin: '20px',
    padding: '30px'
  },
  content: {
    marginTop: '20px'
  },
  paymentOption: {
    margin: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px'
  }
}));

function getSteps() {
  return ['Answer Questions', 'Confirm & Purchase the License', 'Review'];
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const { handleSubmit, setValue, watch, control } = useForm();
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState(null);
  const [formRef, setFormRef] = React.useState(null);

  const steps = getSteps();

  const onSubmit = (newData) => {
    setData(newData);
    console.log(data);
  }

  let isOneTime = watch("isOneTime") === "yes";
  let eventType = watch("eventType");

  const eventTypes = {
    nonOnce: ["danceStudio", "karaoke", "indieCafe"],
    once: ["classicalConcert", "popConcert", "festival"]
  }

  let isOther = eventType != null && !(isOneTime && eventTypes.once.includes(eventType)) && !(!isOneTime && eventTypes.nonOnce.includes(eventType));

  const getStepContent = (step) => {
    switch (step) {
      case 0: return (<form onSubmit={handleSubmit(onSubmit)} ref={(ref) => { setFormRef(ref); }}>
        <div className={classes.questionCard}>
          <label>Where are you going to use this license?</label>
          <Controller
            as={
              <div className={classes.content}>
                <Location onChange={(location) => {
                  setValue("location", location)
                }} />
              </div>
            }
            name="location"
            control={control}
          />
        </div>
        <div className={classes.questionCard}>
          <label className={classes.questionTitle}>Are you going to hold a one-time event with this license?</label>
          <Controller
            as={
              <div className={classes.content}>
                <RadioGroup aria-label="gender" name="gender1" onChange={() => { setValue("eventType", null) }}>
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </div>
            }
            name="isOneTime"
            control={control}
          />
        </div>
        <div className={classes.questionCard}>
          <label className={classes.questionTitle}>Will there be live performance(s) for your event?</label>
          <Controller
            as={
              <div className={classes.content}>
                <RadioGroup aria-label="gender" name="gender1" >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </div>
            }
            name="isLive"
            control={control}
          />
        </div>
        <div className={classes.questionCard}>
          <label className={classes.questionTitle}>Which of the following best describes the type of your event?</label>
          <Controller
            as={
              <div className={classes.content}>
                {isOneTime &&
                  <RadioGroup aria-label="gender" name="gender1">
                    <FormControlLabel
                      value="classicalConcert"
                      control={<Radio checked={eventType === "classicalConcert"} />}
                      label="Classical Concert"
                    />
                    <FormControlLabel
                      value="popConcert"
                      control={<Radio checked={eventType === "popConcert"} />}
                      label="Pop Concert"
                    />
                    <FormControlLabel
                      value="festival"
                      control={<Radio checked={eventType === "festival"} />}
                      label="Festival"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio checked={isOther} />}
                      label={isOther ?
                        <div id="customField">
                          <TextField id="outlined-basic" label="Enter your event type" variant="outlined" />
                        </div> : "Other"}
                    />
                  </RadioGroup>
                }
                {!isOneTime &&
                  <RadioGroup aria-label="gender" name="gender1">
                    <FormControlLabel
                      value="danceStudio"
                      control={<Radio checked={eventType === "danceStudio"} />}
                      label="Dance Studio"
                    />
                    <FormControlLabel
                      value="karaoke"
                      control={<Radio checked={eventType === "karaoke"} />}
                      label="Karaoke"
                    />
                    <FormControlLabel
                      value="indieCafe"
                      control={<Radio checked={eventType === "indieCafe"} />}
                      label="Indie Café"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio checked={isOther} />}
                      label={
                        isOther ?
                          <div id="customField">
                            <TextField id="outlined-basic" label="Enter your event type" variant="outlined" />
                          </div> : "Other"}
                    />
                  </RadioGroup>
                }
              </div>
            }
            name="eventType"
            control={control}
          />
        </div>
        <DevTool control={control} /> {/* set up the dev tool */}
      </form>);
      case 1:
        return (
          <div>
            <LicenseSummary className={classes.content} />
            <Typography className={classes.content} component="h1" variant="h5" color="inherit" align='center'>
              How would you like to pay?
            </Typography>
            <div align='center' className={classes.content}>
              <img alt='Paypal' className={classes.paymentOption} src={process.env.PUBLIC_URL + '/Paypal.svg'}></img>
              <img alt='Cards' className={classes.paymentOption} src={process.env.PUBLIC_URL + '/credit_card.png'} width='80' height='50'>
              </img>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <Typography className={classes.content} component="h1" variant="h5" color="inherit" align='center'>
              Your transaction ID is: 3902-349342035
            </Typography>
            <div align='center' className={classes.content}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {window.print()}}
                startIcon={<DownloadIcon />}
              >
                Print this page
              </Button>
            </div>
            <div className={classes.content}>
              <LicenseSummary />
            </div>
          </div>
        );
      default:
        return 'Unknown step';
    }
  }

  const getStepTitle = (step) => {
    switch (step) {
      case 0:
        return "Your license is on the way. Please answer the following questions to continue.";
      case 1:
        return "Here is a summary of your license."
      case 2:
        return "Congrats! You've got your new license."
      default:
        return "Best of luck!"
    }
  }


  const handleNext = (step) => {
    // Event triggers after users finished each step.
    switch (activeStep) {
      case 0:
        formRef.dispatchEvent(new Event('submit'))
        break;
      default:
        break;
    }

    if (activeStep + 1 !== steps.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    else {
      handleReset();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Typography component="h1" variant="h4" color="inherit" align='center'>
        {getStepTitle(activeStep)}
      </Typography>
      <div>
        <div>
          {/* Form Content */}
          <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
          {/* End Form Content */}
          <div align='center'>
            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
              Back
              </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? 'Apply for another license' : 'Next'}
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}