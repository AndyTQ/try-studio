import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import Summary from './Summary';
import { useFirestore, useFirebase } from 'react-redux-firebase'
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from 'react-hook-form-devtools';
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { getBusinesses } from '../redux/actions/dashActions';


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
  return ['Adding New', 'Confirm', 'Review'];
}

const areEqual = (prevProps, nextProps) => true;

export default function Questions({ businessId }) {
  const classes = useStyles();
  const { handleSubmit, setValue, watch, control, register, errors } = useForm();
  // debugger;
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState(null);
  const [businessForm, setbusinessForm] = React.useState(null);
  const [licenseForm, setlicenseForm] = React.useState(null);
  // Reference to firestore
  const firestore = useFirestore();
  const firebase = useFirebase();

  // Variables for getting the corresponding regional questions.
  const [ country, setCountry ] = React.useState(null);
  const [ cmo, setCmo ] = React.useState(null);
  const [ questionnaire, setQuestionnaire ] = React.useState(null);
  // const [ regionData, setRegionData ] = React.useState(null);

  // Payment
  const [ price, setPrice ] = React.useState(null);

  const steps = getSteps();

  const onSubmit = (newData) => {
    if (!businessId){
      setData(newData,
        setActiveStep(1)
      );
    }
    else {
      // debugger;
      for (let key of Object.keys(newData)) {
        debugger;
        newData[key] = newData[key] == "1" ? true : false;
      }

      fetch(`http://localhost:5000/api/license/price?business_id=${businessId}&answer=${JSON.stringify(newData)}&length=${12}` , {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        },
      }).then(async res => {
        const currPrice = await res.text();
        const convertedPrice = parseFloat(currPrice).toFixed(2);
        await setPrice(convertedPrice);
        let summaryData;
        debugger;
        summaryData = {
          price: currPrice,
          type: "DEF",
          validity: "12" + " " + "months",
          cmo: country == "us" ? "USCMO" : "SOCAN"
        };
        setData(summaryData,
          setActiveStep(1)
        );
      })
    }
  }

  useEffect(() => {
    if (!businessId){
      register({ name: "name" }, { required: true });
      register({ name: "location" }, { required: true });
      register({ name: "country" }, { required: true });
      register({ name: "type" }, { required: true });
      register({ name: "size" }, { pattern: /[0-9]/});
    }
    else {
      if (activeStep == 0){
        fetch(`http://localhost:5000/api/read/business?business_id=${businessId}`).then(async res => {
            res = await res.json();
            console.log(res);
            setCountry(res.country);
            fetch(`http://localhost:5000/api/questions?country=${res.country}`).then(async res => {
              res = await res.json()
              setQuestionnaire(res);
            })
          }
        )
      }
    }
  }, []);

  const basicVenueQuestions = (classes, errors, control,register) => {
    const questions = [{title: "Please enter the name of your business.", name: "name"},
              {title: "What is the size of your venue? (in m²)", name: "size"},
              {title: "What is the address of your business?", name: "location"}]
    
    return questions.map(question => {
        return(
        <div className={classes.questionCard}>
          <label className={classes.questionTitle}>{question.title}</label>
          <Controller
            as={
              <div className={classes.content}>
                <FormControlLabel
                  control={<TextField variant="outlined" label="Enter here" style={{width: 300, marginLeft: 10}}/>}
                />
              </div>
            }
            name={question.name}
            control={control}
            register={register}
          />
          {errors[question.name] && errors[question.name].type === "required" && (
            <Typography variant="body1" color="error"> This field is required</Typography>
          )}
        </div>
        )
    })
  }

  const yesNoPanel = (classes) => {
    return (<div className={classes.content}>
      <RadioGroup aria-label="gender" name="gender1">
        <FormControlLabel
          value="1"
          control={<Radio />}
          label="Yes"
        />
        <FormControlLabel
          value="0"
          control={<Radio />}
          label="No"
        />
      </RadioGroup>
  </div>)
  }

  const newLicense = questionnaire ? (<form onSubmit={handleSubmit(onSubmit)} ref={(ref) => { setlicenseForm(ref); }}>
  {questionnaire.map((question) => 
    <div className={classes.questionCard}>
    <label className={classes.questionTitle}>{question}</label>
      <Controller
        as={
          yesNoPanel(classes)
        }
        name={question}
        control={control}
        register={register}
        rules={{required: true}}
      />
    </div> 
  )} 
</form>) : <></>
  const newBusiness = (<form onSubmit={handleSubmit(onSubmit)} ref={(ref) => { setbusinessForm(ref); }}>
  {basicVenueQuestions(classes, errors, control,register)}
  
  <div className={classes.questionCard}>
    <label className={classes.questionTitle}>Which country is your venue located in?</label>
    <Controller
      as={
        <div className={classes.content}>
            <RadioGroup aria-label="" name="">
              <FormControlLabel
                value="us"
                control={<Radio />}
                label="US"
              />
              <FormControlLabel
                value="canada"
                control={<Radio />}
                label="Canada"
              />
            </RadioGroup>
        </div>
      }
      name="country"
      control={control}
      register={register}
    />
  </div> 
  
  <div className={classes.questionCard}>
    <label className={classes.questionTitle}>Which of the following best describes the type of your event?</label>
    <Controller
      as={
        <div className={classes.content}>
            <RadioGroup aria-label="" name="">
              <FormControlLabel
                value="concert"
                control={<Radio />}
                label="Concert"
              />
              <FormControlLabel
                value="festival"
                control={<Radio />}
                label="Festival"
              />
              <FormControlLabel
                value="danceStudio"
                control={<Radio />}
                label="Dance Studio"
              />
              <FormControlLabel
                value="karaoke"
                control={<Radio />}
                label="Karaoke"
              />
              <FormControlLabel
                value="indieCafe"
                control={<Radio />}
                label="Indie Café"
              />
              <FormControlLabel
                value="other"
                control={<Radio disabled/>}
                label="Other (Coming Soon)"
              />
            </RadioGroup>
        </div>
      }
      name="type"
      control={control}
      register={register}
    />
  </div> 
</form>);
  
  const getStepContent = (step) => {
    switch (step) {
      case 0: 
      if (!businessId){
        return (newBusiness);
      } else {
        if (questionnaire){ // Check if License questionairre is available.
          return (newLicense);
        } else {
          return;
        }
      }
      case 1:
        return (
          <div>
            {data ? <Summary className={classes.content} data={data}/> : <></>}
            <Typography className={classes.content} component="h1" variant="body1" color="inherit" align='center'>
              {businessId? "How would you like to pay?" : "Please click 'NEXT' if you are satisfied with your information."}
            </Typography>
            {businessId?  
            <div align='center' className={classes.content}>
              <Button
              variant="outlined"
              onClick={handleNext}
              className={classes.button}
            ><img alt='Paypal' className={classes.paymentOption} src={process.env.PUBLIC_URL + '/Paypal.svg'}></img></Button>
              <Button
              variant="outlined"
              onClick={handleNext}
              className={classes.button}
            ><img alt='Cards' className={classes.paymentOption} src={process.env.PUBLIC_URL + '/credit_card.png'} width='80' height='50'>
            </img></Button>
              
            </div>
            : <></>
            }
          </div>
        );
      case 2:
        return (
          businessId ? (
          <div>
            <Typography className={classes.content} component="h1" variant="h5" color="inherit" align='center'>
              {businessId ? "Congrats! You've got a new license." : "You can now add a license for your business."}
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
            <div className={classes.content} >
              <Summary data={data}/>
            </div>
          </div>) : <></>
        );
      default:
        return 'Unknown step';
    }
  }

  const getStepTitle = (step) => {
    switch (step) {
      case 0:
        return businessId ? "Answer some short questions, and you're ready to go!" : "Add a new business to start playing music!";
      case 1:
        return businessId ? "Here is a summary of your license." : "Here is a summary of your business."
      case 2:
        return businessId ? "Congrats! Your new license has been created." : "Congrats! Your new business has been added."
      default:
        return "Best of luck!"
    }
  }


  const handleNext = () => {
    // Event triggers after users finished each step.
    switch (activeStep) {
      case 0:
        businessId ? licenseForm.dispatchEvent(new Event('submit')) : businessForm.dispatchEvent(new Event('submit'));
        break;
      case 1:
        // Submit data to firestore
        if (!businessId){
          fireStoreAddBusiness();
        } else {
            fireStoreAddLicense();
          }
        break;
      default:
        handleReset();
    }
  };

  const fireStoreAddBusiness = () => {
    // call the add license API!
    const endpoint = "http://localhost:5000/api/create/business";
    const payload = data;
    // debugger;
    fetch(endpoint , {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    }).then(async res => {
      if(!res.ok) {
        console.error("Error in adding business");
      }
      else {
        console.log("Business successfully added");
        console.log(res);
        setActiveStep(2);
      }   
    })
  }

  const fireStoreAddLicense = () => {
    // call the add license API!
    const endpoint = "http://localhost:5000/api/create/license";
    const payload = {
      "businessId": businessId,
      "cmo": country == "us" ? "USCMO" : "SOCAN",
      "price": price,
      "type": "DEF",
      "validity": 12
    };
    debugger;
    fetch(endpoint , {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    }).then(async res => {
      if(!res.ok) {
        console.error("Error in adding license");
      }
      else {
        console.log("License successfully added");
        console.log(res);
        setActiveStep(2);
      }   
    })
  }

  const addUserData = (type, newId) => {
    let uid = firebase.auth().currentUser.uid;
    firestore.collection('users').doc(uid).get().then((doc) =>{ 
      let userData = doc.data(); 
      userData[type].push(newId);
      firestore.collection('users').doc(uid).set(userData).then((doc) => {
          setActiveStep(2);
        }
      );
    }
    );
  }

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
          <Typography className={classes.instructions}>{(!businessId || questionnaire) ? getStepContent(activeStep) : ""}</Typography>
          {/* End Form Content */}
          <div align='center'>
          {activeStep !== steps.length - 1 ? 
          (<div><Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
              Back
              </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              Next
          </Button></div>) : <></>}
          <div style={{marginTop: 10}}>
          </div>
          </div>
        </div>
      </div>
    </div>
  );

};

// const authenticatedRequest = function(method, url, body) {
//   if (!firebase.auth().currentUser) {
//     throw new Error('Not authenticated. Make sure you\'re signed in!');
//   }

//   // Get the Firebase auth token to authenticate the request
//   return firebase.auth().currentUser.getIdToken().then(function(token) {
//     var request = {
//       method: method,
//       url: url,
//       dataType: 'json',
//       beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + token); }
//     };

//     if (method === 'POST') {
//       request.contentType = 'application/json';
//       request.body = JSON.stringify(body);
//     }

//     console.log('Making authenticated request:', method, url);
//     return $.ajax(request).catch(function() {
//       throw new Error('Request error: ' + method + ' ' + url);
//     });
//   });
// };




