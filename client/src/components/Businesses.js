import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { getBusinesses } from '../redux/actions/dashActions';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LicenseTable from './LicenseTable';
import Modal from './Modal';
import BusinessIcon from '@material-ui/icons/Business';

import Questions from './Questions';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  content: {
    width: 345,
    margin: 20,
    boxShadow: "0 0 14px 0 rgba(53,64,82,.1)",
  },
  card: {
    whiteSpace: "pre",
  },
});

const image = {
  concert: process.env.PUBLIC_URL + "/concert.jpg",
  festival: process.env.PUBLIC_URL + "/festival.jpeg",
  danceStudio: process.env.PUBLIC_URL + "/dance.jpg",
  indieCafe: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2862&q=80",
  karaoke: "https://images.unsplash.com/photo-1485579149621-3123dd979885?ixlib=rb-1.2.1&auto=format&fit=crop&w=2978&q=80",
}


const businessCard = (business, classes, setCurrBusiness, setShowLicense) => {
  return (
  <Card key={business.name} className={classes.content}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="photo"
            height="140"
            image={image[business.type]}
            title="photo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {business.name}
            </Typography>
            <Typography className={classes.card} variant="body2" color="textSecondary" component="p">
              {`${business.location}\n`}
              {`ID: ${business.id}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant='outlined' color='primary' onClick={() => {setCurrBusiness(business); setShowLicense(true);}}> Licenses </Button>
        </CardActions>
      </Card>
    );
}

const Businesses = props => {
  const { businesses, getBusinesses } = props;

  const [ showLicense, setShowLicense ] = useState(false);
  const [ showNewBusiness, setShowNewBusiness ] = useState(false);
  const [ currBusiness, setCurrBusiness ] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    getBusinesses();
  }, []);

  return (
    <div className={classes.root}>
      {businesses.map(business => (
        businessCard(business, classes,  setCurrBusiness, setShowLicense)
      ))}
      {currBusiness ? 
      <Modal name="Licenses" open={showLicense} handleClose={() => {setShowLicense(false);}}> 
        <LicenseTable title="Licenses" businessId={currBusiness.id}></LicenseTable>
      </Modal> : <></>}
      {addNewCard(classes, setShowNewBusiness, showNewBusiness)}
    </div>
  );
}

const addNewCard = (classes, setShowNewBusiness, showNewBusiness) => {
  return (
  <Card className={classes.content}>
    <Button onClick={() => {setShowNewBusiness(true);}} style={{height: '100%', width: '100%'}}>
      <div align='center'>
        <BusinessIcon style={{ fontSize: '150px', color: 'grey'}}/>
        <Typography align='center' style={{color: 'grey'}}gutterBottom variant="h5" component="h2">
        Add A New Business
        </Typography>
      </div>
    </Button>
    <Modal name="Licenses" open={showNewBusiness} handleClose={() => {
      setShowNewBusiness(false);
      window.location.reload();
    }}> 
      <Questions />
    </Modal>
  </Card>
  );
}

export const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    businesses: state.dash.businesses
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getBusinesses: () => dispatch(getBusinesses())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
